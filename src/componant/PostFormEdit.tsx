import { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Box, Snackbar, TextField } from '@mui/material';
import { FileWithPath, useDropzone } from 'react-dropzone'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { createPost } from '../lib/api/storageApi';
import { useUserContext } from '../lib/context/AuthContext';
import { useNavigate } from 'react-router-dom';





function PostFormEdit({post}:any) {

  const [file, setFile] = useState<File[]>([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('')
  const [formData, setFormData] = useState(post || {}  )
  useEffect(()=>{
    setFormData(post)
  },[post])
  
  console.log(fileUrl)
  const navigate = useNavigate()
  const { user } = useUserContext()
  

  const handelChange = (e:any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
  }

  const handelSubmit = async () => {
    if (formData.caption == '' && formData.location == '' && formData.location == '') setOpen(true)
    setLoading(true)
     await createPost(formData, file,user).then(()=>{
        setLoading(false)
      navigate('/')
    })
  }


  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (!isDragReject) setOpen(true)
    setFile(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'images/': ['.jpeg', '.jpg', '.png', '.svg']
    }
  })
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <form onSubmit={handelSubmit} className=' flex flex-col gap-9 w-full max-w-5xl ' >
      <Snackbar
        open={open}
        color='red'
        autoHideDuration={6000}
        onClose={handleClose}
        message="Wrong File Type ! please try again "
      />
      <Box className="flex flex-col mt-3  gap-4">
        <label htmlFor="">caption</label>
        <textarea
          id="outlined-multiline-static"
          className='shad-textarea custom-scrollbar'
          onChange={handelChange}
          value={ formData.caption  }
          name='caption'
          style={{ backgroundColor: "#424242" }}
        />
      </Box>
      <Box className="flex flex-col mt-3  gap-4">
        <label htmlFor="">Add Photo</label>
        <div {...getRootProps()} className=' flex flex-center rounded-3xl cursor-pointer bg-dark-3' >
          <input {...getInputProps()} className=' cursor-pointer' />
          {
            fileUrl ? (
              <div className=' flex flex-col w-full p-5 lg:p-10'>
                <img
                  src={fileUrl}
                  alt='uplode img'
                  className='file_uploder-img'
                />
              </div>
            ) : (
              <div className='file_uploader-box gap-2'>
                <PermMediaIcon />
                <h2 className=' text-light-2' >Drag  photo here ....</h2>
                <p className=' text-light-4' >svg, png , jpg</p>
                <Button className='shad-button_dark_4 gap-4' variant="contained" >select from computer</Button>
              </div>
            )
          }
        </div>
      </Box>
      <Box className="flex flex-col mt-3  gap-4">
        <label htmlFor="">Add Location</label>
        <TextField
          id="outlined-multiline-static"
          type='text'
          className='shad-input placeholder:text-light-4  '
          onChange={handelChange}
          value={formData.location}
          required
          name='location'
          style={{ backgroundColor: "#424242" }}
        />
      </Box>
      <Box className="flex flex-col mt-3  gap-4">
        <label htmlFor="">Add Tags</label>
        <TextField
          id="outlined-multiline-static"
          type='text'
          required
          className='shad-input placeholder:text-light-4 '
          onChange={handelChange}
          value={formData.tags}
          name='tags'
          style={{ backgroundColor: "#424242" }}
        />
      </Box>
      <div className='flex flex-row gap-3'>
        <Button className='shad-button_dark_4' onClick={handelSubmit} variant="contained" >cancel</Button>
        <Button className='' onClick={handelSubmit} variant="contained" >{loading?'loading....':'submit'}</Button>

      </div>

    </form>
  )
}

export default PostFormEdit;