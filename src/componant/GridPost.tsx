import { Link } from "react-router-dom"


const GridPost = ({posts}:any) => {
  return (
    <ul className="grid-container">
      {
        posts.map((post:any)=>{
          console.log(post)
            return(
            <li key={post.id} className="relative min-w-80 h-80 " > 
                <Link className="grid-post_link" to={`/posts/${post.id}`} >
                    <img src={post.files.URL} className="h-full w-full object-cover" alt="grid Post" />
                </Link>
                <div className="grid-post_user">
                    <div className="flex" >
                        <img src={post.creator.imageUrl} alt={"creator"} className="h-8 w-8 rounded-full" />
                        <p className="line-clamp-2 mt-1 pl-4" > { post.creator.name } </p>
                    </div>
                </div>
            </li>)
        })
      }
    </ul>
  )
}

export default GridPost
