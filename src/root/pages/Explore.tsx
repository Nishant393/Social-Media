import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { getExplorePost } from '../../lib/api';
import GridPost from '../../componant/GridPost';

const Explore = () => {

  const [searchValue, setSearchValue] = useState('')
  const [post, setPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  
  const getExplorePosts = async () => {
    setIsLoading(true)
    const data:any = await getExplorePost()
    setPost(data)
    setIsLoading(false)
  }
  
  useEffect(() => {
    getExplorePosts()
  }, [])
  
  const getFilterPosts = (post:any, value:string) => {
    return post.filter((post:any) => {
      return (post.caption?.toLowerCase().includes(value.toLowerCase()))
    });
  };

  const filterPost = getFilterPosts(post, searchValue)

  
  return (
    <div className='explore-container'>
      <div className='explore-inner_container' >
        <h2 className=' w-full h3-bold md:h2-bold ' >Search Posts</h2>
        <div className='bg-dark-4 w-full rounded-lg flex gap 1 ' >

          <SearchIcon fontSize='large' className='mr-3' />
          <input
            placeholder='explore'
            onChange={(e)=>setSearchValue(e.target.value)}
            value={searchValue}
            name='explore'
            type='text'
            className='explore-search w-full'
          />
        </div>
        <div className=' w-full max-w-5xl mt-17 mb-7' >
          <h2 className='small-medium md:base-medium text-light-2' >Popular Post</h2>
        </div>
        {
          isLoading ? (<>
            loading.....
          </>):
            <GridPost posts={filterPost} />
        }

      </div>
    </div>
  )
}

export default Explore
