import { Button } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router-dom"
import PostStats from "./PostStats"
import { useUserContext } from "../lib/context/AuthContext"
import { deletePost } from "../lib/api"




function PostsDetail({ post }: any) {

    const { id }: any = useParams()
    const { user } = useUserContext()
    const navigate = useNavigate()


    const handelPostDelete = async () => {
        await deletePost(id).then(() => {
            console.log('delete')
            navigate('/')
        })
    }

    return (
        <div className='post_details-card' >
            <img className="post_details-img" src={`${post.files.URL}`} alt="loading" />
            <div className='post_details-info' >

                <div className='w-full flex-between'>

                    <Link to={`/profile/${post?.creator.id}`} className='flex items-center gap-3'>
                        <img src={`${post?.creator.imageUrl}`} alt="creator" className="w-12 lg:h-12 rounded-full" />
                        <div className="flex flex-col" >
                            <p className="base-medium lg:body-bold text-light-1" >{post?.creator.name}</p>
                            <div className="flex-center gap-2 text-light-3">
                                <p className=" subtitle-semibold" >{post?.creator.username}</p>-<p className=" subtitle-semibold" > {post?.location} </p>
                            </div>
                        </div>
                    </Link>
                    <div className={`${post.creator.id !== user.id ? 'hidden' : 'flex'} `}>
                        <Button onClick={handelPostDelete} >
                            delete
                        </Button>
                    </div>
                </div>
                <hr className=' border w-full border-dark-4/80' />
                <div className="lg:base-medium py-5 small-medium" >
                    <p>{post.caption}</p>
                    <p className="text-light-3"> #{post.tags}</p>
                </div>
                <div className=' w-full '>
                    <PostStats post={post} />
                </div>
            </div>
        </div>
    )
}

export default PostsDetail