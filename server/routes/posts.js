import express from 'express'
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, getPostsBySearch } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/search', getPostsBySearch)
router.get('/:id', getPost)
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.put('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)


export default router