import EditIcon from '@mui/icons-material/Edit';
import PostFormEdit from '../../componant/PostFormEdit';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../lib/api';
import { useEffect, useState } from 'react';



const EditPost = () => {
  const { id }:any = useParams()
  const [post , setPost ] = useState({})

  const getpost = async (id:string) => {
    const Post:any = await getPostById(id)
   setPost(Post) 
  }
  useEffect(()=>{
   getpost(id)
  },[])
  
  return (
    <div className='flex flex-1'>
      <div className='common-container w-full'>
        <div className='flex flex-row w-full '>
          <EditIcon className='mt-1 mr-1' />
          <h2 className=' h3-bold' >Edit Post</h2>
        </div>
        <PostFormEdit post={post} />
      </div>
    </div>
  )
}

export default EditPost
