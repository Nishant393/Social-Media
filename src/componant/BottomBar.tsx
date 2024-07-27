import {  NavLink } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const BottomBar = () => {
  return (
    <div className='bottom-bar'>
            <NavLink to={'/'} className= {({isActive})=> isActive ? ' bg-primary-500 bottomBar-link rounded-lg flex flex-col gap-1 group items-center p-2': 'bottombar-link flex flex-col gap-1 items-center p-2 ' } >
              <HomeIcon />
            <p>Home</p>  
            </NavLink>
            <NavLink to={'/explore'} className= {({isActive})=> isActive ? ' bg-primary-500 bottomBar-link rounded-lg flex flex-col gap-1 group items-center p-2': 'bottombar-link flex flex-col gap-1 items-center p-2 ' } >
              <CollectionsIcon />
              Explore
            </NavLink>
            <NavLink to={'/saved'} className= {({isActive})=> isActive ? ' bg-primary-500 bottomBar-link rounded-lg flex flex-col gap-1 group items-center p-2': 'bottombar-link flex flex-col gap-1 items-center p-2 ' }>
              <BookmarksIcon />
              Saved
            </NavLink>
            <NavLink to={'/create-post'} className= {({isActive})=> isActive ? ' bg-primary-500 bottomBar-link rounded-lg flex flex-col gap-1 group items-center p-2': 'bottombar-link flex flex-col gap-1 items-center p-2 ' }>
              <CreateNewFolderIcon />
              Create Post
            </NavLink>
    </div>
  )
}

export default BottomBar