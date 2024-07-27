import { Link } from "react-router-dom"
import PostStats from "./PostStats"

const PostCard = ({posts}: any) => {
  console.log("posts",posts)

  return (
    <div className="post-card gap-4" >
      <div className="flex-between" >
        <div className="flex items-center gap-3" >
          <Link to={`/profile/${posts.creator.id}`}>
            <img src={`${posts.creator.imageUrl}`} alt="creator" className="w-12 lg:h-12 rounded-full" />
          </Link>
          <div className="flex flex-col" >
            <p className="base-medium lg:body-bold text-light-1" >{posts.creator.name}</p>
            <div className="flex-center gap-2 text-light-3">
              <p className=" subtitle-semibold" >{posts.creator.username}</p> -
              <p className=" subtitle-semibold" > {posts.location} </p>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/posts/${posts.id}`}>
        <div className="lg:base-medium py-5 small-medium" >
          <p>{posts.caption}</p>
          <p className="text-light-3"> #{posts.tags}</p>
        </div>
        <img className="post-card_img" src={`${posts.files.URL}`} alt="loading" />
      </Link>
      <PostStats post={posts}  />
    </div>
  )
}

export default PostCard
