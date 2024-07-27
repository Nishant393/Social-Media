import { useEffect, useState } from 'react';
import {  getSavedPost } from '../../lib/api';
import { useUserContext } from '../../lib/context/AuthContext';
import GridSaved from '../../componant/GridSaved';

const saved = () => {

  const [savedPost, setSavedPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const {user} = useUserContext()
  
  const getSavedPosts = async () => {
    setIsLoading(true)
    const data:any = await getSavedPost(user)
    setSavedPost(data)
    setIsLoading(false)
  }
 

  useEffect(() => {
    getSavedPosts()
  }, [])
  
  return (
    <div className='explore-container'>
      <div className='explore-inner_container' >
        <h2 className=' w-full h3-bold md:h2-bold ' >Saved Posts</h2>
        
        {
          isLoading ? (<>
            loading.....
          </>) : <GridSaved posts={savedPost}/>
        }

      </div>
    </div>
  )
}

export default saved
