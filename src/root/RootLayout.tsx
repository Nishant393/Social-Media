
import { Outlet } from 'react-router-dom'
import TopBar from '../componant/TopBar'
import BottomBar from '../componant/BottomBar'
import LeftSideBar from '../componant/LeftSideBar'

function RootLayout() {
  return (
    <div className='w-full md:flex'>
        <TopBar/>
        <LeftSideBar/>
        <section className='flex flex-1 h-full'>
          <Outlet/>
        </section>
        <BottomBar/>
    </div>
  )
}

export default RootLayout