import { useState } from 'react'
import Button from '@mui/material/Button';
import { Box, TextField} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createNewUser } from '../../lib/api';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  
  const handelChange = (e:any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log('formData')
  }

  const handelSubmit = async () => {
    const newUser = await createNewUser(formData)
    if(!newUser){
      console.log('newUser')
      console.log(newUser)
      navigate('/sign-in')
    }
  }



  return (
    <div className='h-screen sm:w-1/2 w-420 flex flex-col items-center justify-center'>
      <Box className="flex flex-row">
        <h2 className='mx-3' >logo</h2>
        <h2>sapologarm</h2>
      </Box>
      <p className='text-light-4' > To use socialgram enter the details</p>
      <form onSubmit={handelSubmit} >
        <Box className="flex flex-col mt-3 ">
          <label htmlFor="">Name</label>
          <TextField
            id="outlined-multiline-static"
            placeholder='name'
            size='small'
            onChange={handelChange}
            value={formData.name}
            name="name"
            type='name'
            margin='dense'
            style={{ backgroundColor: "#424242" }}
          />
        </Box>
        <Box className="flex flex-col mt-3 ">
          <label htmlFor="">User Name</label>
          <TextField
            id="outlined-multiline-static"
            placeholder='username'
            size='small'
            onChange={handelChange}
            value={formData.username}
            name='username'
            type='username'
            margin='dense'
            style={{ backgroundColor: "#424242" }}
          />
        </Box>
        <Box className="flex flex-col mt-3 ">
          <label htmlFor="">Email</label>
          <TextField
            id="outlined-multiline-static"
            placeholder='email'
            onChange={handelChange}
            value={formData.email}
            name='email'
            size='small'
            type='email'
            margin='dense'
            style={{ backgroundColor: "#424242" }}
          />
        </Box>
        <Box className="flex flex-col mt-3 ">
          <label htmlFor="">Password</label>
          <TextField
            id="outlined-multiline-static"
            placeholder='password'
            onChange={handelChange}
            value={formData.password}
            name='password'
            size='small'
            type='password'
            margin='dense'
            style={{ backgroundColor: "#424242" }}
          />
        </Box>
        <Button className='items-center' onClick={handelSubmit} variant="contained" >Sign Up</Button>
      </form>
      <Box className="flex flex-row mt-4 ">
        <p className=''> Already have an account?</p>
        <Link to='/sign-in' className='text-light-4'>Login</Link>
      </Box>
    </div>
  )
}

export default SignUp;