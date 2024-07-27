import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import GridPost from '../../componant/GridPost';
import { getRecentPost, getUserById } from '../../lib/api';
import { useParams } from 'react-router-dom';
import ProfileUser from '../../componant/ProfileUser';

const Profile = () => {

  const [value, setValue] = React.useState(0);
  const [userPost, setUserPost] = useState([]);
  const [user, setUser] = useState([]);
  const [isPostLoading,setIsPostLoading] = useState(false)
  const {id}:any = useParams()
  const getUserPost = async()=>{
    setIsPostLoading(true)
    const post:any = await getRecentPost(id)
    const user:any = await getUserById(id)
    setUser(user)
    setUserPost(post)
    setIsPostLoading(false)
  }
  
  const handleChange = ( newValue:any) => {
    setValue(newValue);
  };
  
  useEffect(()=>{
    getUserPost()
  },[])
  
  return (
    <div className='profile-container'>
      <div className='profile-inner_container' >
        <ProfileUser user={user} />
      </div>
      <div className=' justify-start w-full'>
        <div className='flex flex-col'>
          <Tabs value={value} className='profile-tab '
            textColor="inherit"
            aria-label="secondary tabs example" onChange={handleChange} >
            <Tab
              label="Posts" {...a11yProps(0)}
            />
            <Tab label="Like" {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            {
              isPostLoading ?(
                <>
                  loading.....
                </>
              ):<GridPost posts = {userPost} />
            }
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            like
          </CustomTabPanel>
        </div>
      </div>
    </div>
  )
}


function CustomTabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default Profile