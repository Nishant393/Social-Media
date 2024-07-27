import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../public/assets/Logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import { useUserContext } from "../lib/context/AuthContext";
import { signOutFn } from "../lib/api";
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import GroupIcon from '@mui/icons-material/Group';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

function LeftSideBar() {

  const { user } = useUserContext()
  const navigate = useNavigate()
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11 ' >
        <Link
          className="flex gap-3 items-center"
          to='/'
        >
          <img src={logo} alt='logo' width={50} height={50} />
          <h2 className=" border-l body-bold" >Sapologram</h2>
        </Link>
        <Link to={`/profile/${user.id}`} className="flex-center gap-3">
          <img src={user.imageUrl} className="h-8 w-8 rounded-full" />
          <div className="flex flex-col ">
            <p className=" body-bold "> {user.name} </p>
            <p className=" small-regular text-light-3 "> @{user.username} </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6" >
            <NavLink to={'/'} className= {({isActive})=> isActive ? ' bg-primary-500 leftsidebar-link flex gap-4 items-center p-4': 'leftsidebar-link flex gap-4 items-center p-4' } >
              <HomeIcon />
              Home
            </NavLink>
            <NavLink to={'/explore'} className= {({isActive})=> isActive ? ' bg-primary-500 leftsidebar-link flex gap-4 items-center p-4': 'leftsidebar-link flex gap-4 items-center p-4' } >
              <CollectionsIcon />
              Explore
            </NavLink>
            <NavLink to={'/all-users'} className= {({isActive})=> isActive ? ' bg-primary-500 leftsidebar-link flex gap-4 items-center p-4': 'leftsidebar-link flex gap-4 items-center p-4' } >
              <GroupIcon />
              Pepole
            </NavLink>
            <NavLink to={'/saved'} className= {({isActive})=> isActive ? ' bg-primary-500 leftsidebar-link flex gap-4 items-center p-4': 'leftsidebar-link flex gap-4 items-center p-4' }>
              <BookmarksIcon />
              Saved
            </NavLink>
            <NavLink to={'/create-post'} className= {({isActive})=> isActive ? ' bg-primary-500 leftsidebar-link flex gap-4 items-center p-4': 'leftsidebar-link flex gap-4 items-center p-4' } >
              <CreateNewFolderIcon />
              Create Post
            </NavLink>
        </ul>
      </div>

      <Button className="flex gap-4"  onClick={()=>{
       const isUserSignOut:any = signOutFn()
       isUserSignOut ? navigate('sign-in'):navigate('')
        }  } >
        <LogoutIcon style={{ color: "purple" }}  />
        <p className=" small-medium lg:base-medium" >Logout</p>
      </Button>

    </nav>
  )
}

export default LeftSideBar