import { useContext, useEffect, useState } from 'react'
import myContext from '../Context/MyContext'
import { getProfile, getUserId } from '../utils/user'

// Optimistically toggles the current user's like on a post, then syncs with the server's result
// (or rolls back if the request fails).
const useLike = (post) => {
    const { likePost } = useContext(myContext)
    const [likes, setLikes] = useState(post?.likes || [])
    const userId = getUserId(getProfile())

    useEffect(() => {
        setLikes(post?.likes || [])
    }, [post])

    const hasLiked = Boolean(userId) && likes.includes(userId)

    const toggleLike = async () => {
        if (!userId) return
        const previous = likes
        setLikes(hasLiked ? likes.filter((id) => id !== userId) : [...likes, userId])

        const updatedPost = await likePost(post._id)
        setLikes(updatedPost?.likes || previous)
    }

    return { likes, hasLiked, toggleLike, canLike: Boolean(userId) }
}

export default useLike
