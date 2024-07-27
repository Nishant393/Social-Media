
import { useEffect, useState } from 'react';
import { getExplorePost} from '../../lib/api'
import PostCard from '../../componant/PostCard';


function Home() {
  const [isPostPending, setIsPostPending] = useState(false)
  const [posts,setPosts] = useState([])
  

  useEffect(()=>{
    displayPosts()
  },[])

  async function displayPosts() {
    try {
      setIsPostPending(true)
      const allPost:any = await getExplorePost();
        // allPosts = allPost
        if(allPost){
          setPosts(allPost)
          setIsPostPending(false)
        }
    } catch (error) {
      console.error('Error displaying posts:', error);
    }
  }

  return (
    <div className='flex flex-1 ' >
      <div className='home-container' >
        <div className='home-posts'>
          <h2 className='w-full md:h2-bold h3-bold text-left' >Home Feed</h2>
          {
            isPostPending ? (
              <div>Loading ....</div>
            ) : (
              <ul className='gap-9 w-full flex flex-1 flex-col' >
                {
                  posts?.map((post:any) => {
                  return (
                    <PostCard key={post?.id} posts={post}/>
                  )
                })
                }
              </ul>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Home