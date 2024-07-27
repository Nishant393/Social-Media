import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PostForm from '../../componant/PostForm';

const CreatePost = () => {
  
  return (
    <div className='flex flex-1'>
      <div className='common-container w-full'>
        <div className='flex flex-row w-full '>
          <CreateNewFolderIcon className='mt-1 mr-1' />
          <h2 className=' h3-bold' >Create Post</h2>
        </div>
        <PostForm/>
      </div>
    </div>
  )
}

export default CreatePost
