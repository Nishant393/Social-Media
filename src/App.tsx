import "./globals.css"
import { Route, Routes } from "react-router-dom"
import SignIn from "./auth/forms/SignIn"
import AuthLayout from "./auth/AuthLayout"
import SignUp from "./auth/forms/SignUp"
import RootLayout from "./root/RootLayout"
import Home from "./root/pages/Home"
import Saved from "./root/pages/Saved"
import AllUsers from "./root/pages/AllUsers"
import CreatePost from "./root/pages/CreatePost"
import EditPost from "./root/pages/EditPost"
import Profile from "./root/pages/Profile"
import UpdateProfile from "./root/pages/UpdateProfile"
import PostDetails from "./root/pages/PostDetails"
import Explore from "./root/pages/Explore"


function App() {
  return (
    <>
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Route>
        <Route  element={<RootLayout/>}>
          <Route  index element={<Home/>}/>
          <Route  path="/explore" element={<Explore/>}/>
          <Route  path="/saved" element={<Saved/>}/>
          <Route  path="/all-users" element={<AllUsers/>}/>
          <Route  path="/create-post" element={<CreatePost/>}/>
          <Route  path="/update-post/:id" element={<EditPost/>}/>
          <Route  path="/posts/:id" element={<PostDetails/>}/>
          <Route  path="/profile/:id/*" element={<Profile/>}/>
          <Route  path="/update-profile/:id/" element={<UpdateProfile/>}/>
        </Route>
      </Routes>
    </main>
    </>
  )
}

export default App
