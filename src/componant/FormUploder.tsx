import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Button } from '@mui/material';

function FormUploder() {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState('')

  const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
    setFile(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'images/*': ['.jpeg', '.jpg', '.png', '.svg']
    }
  })

  return (
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
  )
}

export default FormUploder