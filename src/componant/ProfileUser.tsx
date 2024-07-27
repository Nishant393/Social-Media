import { Button } from "@mui/material"

const ProfileUser = ({user}:any) => {
  return (
    <div className='flex w-full '>
          <img src={user?.imageUrl} alt="profile Photo" className=' h-40 w-40 rounded-full ' />
          <div className='pl-3 flex flex-col justify-between items-start'>
            <div>
              <h2 className='h1-bold md:h2-bold' >{user.name} </h2>
              <p>@{user.userName}</p>

            </div>
            <div className='flex gap-3'>
              <p>0 posts</p>
              <p>0 followers</p>
              <p>0 following</p>
            </div>
          </div>
          <Button>Edit</Button>

        </div>
  )
}

export default ProfileUser
