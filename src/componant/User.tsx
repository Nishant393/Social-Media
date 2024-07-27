

export const User = ({user}:any) => {
  return (
    <div className=" gap-1 flex flex-1 flex-col  " >
        <img src={user.imageUrl} alt="user" />
        <h4>{user.name}</h4>
        <p className="text-dark-3" >{user.userName}</p>
    </div>
  )
}
