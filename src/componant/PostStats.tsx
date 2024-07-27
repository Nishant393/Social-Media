import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useUserContext } from '../lib/context/AuthContext';
import { checkIsLiked, checkIsSaved, deleteSavedPost,  likePost, savedPost } from '../lib/api';


const PostStats = (post:any) => {
  const { user } = useUserContext()
  const likeList = post.post.likes
  const [likes, setLikes] = useState(likeList)
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [isPostSaved, setIsPostSaved] = useState(false)

  const handelLikePost = async () => {
    let newLikes:any = [...likes]
    const hasLiked = newLikes.includes(user.id)
    if (hasLiked) {
      newLikes = newLikes.filter((id:any) => id !== user.id)
      setIsPostLiked(false)
    } else {
      newLikes.push(user.id)
      setIsPostLiked(true)
    }
    setLikes(newLikes)
    await likePost(post.post.id, newLikes)
  }

  const handelSavePost = async () => {
    if (isPostSaved) {
      deleteSavedPost(post.post.id)
      checkPost()
    } else {
      await savedPost(user, post.post)
      checkPost()
    }
  }

  const checkLike = async () => {
    const isLike = await checkIsLiked(user.id, post.post.id)
    setIsPostLiked(isLike)
  }
  
  const checkPost = async () => {
    const check:any = await checkIsSaved(user, post.post)
    if (check.length === 0) {
      setIsPostSaved(false)
    } else {
      setIsPostSaved(true)
    }
  }

  useEffect(() => {
    checkLike()
    checkPost()
  }, [])

  return (
    <div className="z-20 items-center justify-between flex" >
      <div className="flex gap-2 mr-4 " >
        {
          isPostLiked ? (
            <FavoriteIcon onClick={handelLikePost} className='cursor-pointer' sx={{ color: pink[500] }} />
          ) : (<FavoriteBorderIcon onClick={handelLikePost} className=' cursor-pointer' />)
        }
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 cursor-pointer">
        {
          isPostSaved ? (<TurnedInIcon onClick={handelSavePost} />) : (<TurnedInNotIcon onClick={handelSavePost} />)
        }
      </div>
    </div>
  )
}

export default PostStats
