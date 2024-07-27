import { useState } from 'react'
import Button from '@mui/material/Button';
import { Box, Snackbar, TextField} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser,signInAccount } from '../../lib/api';
import { useUserContext } from '../../lib/context/AuthContext';


function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (/* click */) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };

  
  
  const navigate = useNavigate()
  
  const {checkAuthUser}=useUserContext()
  const handelChange = (e:any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log('formData')
  }

  const handelSubmit = async () => {
    await signInAccount(formData)
    await getCurrentUser()
    checkAuthUser()

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn){
      navigate('/')
    }else{
      setOpen(true)
    }
  }



  return (
    <div className='h-screen sm:w-1/2 w-420 flex flex-col items-center justify-center'>
      <Snackbar
        open={open}
        color='red'
        autoHideDuration={6000}
        onClose={handleClose}
        message="Login failed ! please try agian "
      />
      
      <Box className="flex flex-row">
        <h2 className='mx-3' >logo</h2>
        <h2>sapologarm</h2>
      </Box>
      <p className='text-light-4' > Login In To Your Account</p>
      <form onSubmit={handelSubmit} >
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
        <Button className='items-center' onClick={handelSubmit} variant="contained" >Login</Button>
      </form>
      <Box className="flex flex-row mt-4 ">
        <p className=''> Don`t have an account ?</p>
        <Link to='/sign-up' className='text-light-4'>Sign up</Link>
      </Box>
    </div>
  )
}

export default SignIn;

