
import { useEffect, useState } from 'react';
import { getPostById } from '../../lib/api'
import { useParams } from 'react-router-dom';
import PostsDetail from '../../componant/PostsDetail';




function PostDetails() {
  const [isPostPending, setIsPostPending] = useState(true)
  const { id }:any = useParams()
  const [post, setPost] = useState({})

  const getpost = async (id:string) => {
    setIsPostPending(true)
    try {
      const Post: any = await getPostById(id)
      setPost(Post)
      setIsPostPending(false)
      
    } catch (error) {
      console.log(error)
      setIsPostPending(true)
      
    }
  }
  
  
  useEffect(() => {
    getpost(id)
  
  }, [])



  return (
    <div className='post_details-container' >
      {
        isPostPending ? (
          <div>Loading ....</div>
        ) : (
            <PostsDetail post={post} />
        )
      }
    </div>
  )
}

export default PostDetails