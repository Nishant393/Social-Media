
import { Navigate, Outlet } from 'react-router-dom'
import img from "../../public//assets/images.jpeg"

function AuthLayout() {
  const isAuth=false;
  return (
    <>
    {isAuth ? (
    <Navigate to={"/"}/>
    ):(
      <>
      <section className='flex justify-end h-screen '>
      <Outlet/>
          <img src={img} className='w-0 h-screen xl:block sm:w-1/2 object-cover bg-no-repeat' />
      </section>
      </>
    )}
    </>
  )
}

export default AuthLayout