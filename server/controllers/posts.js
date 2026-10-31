import mongoose from "mongoose"
import PostMessage from "../models/postMesaage.js"
import User from "../models/user.js"

const LIMIT = 6 // posts per page

const toPage = (page) => Math.max(Number(page) || 1, 1)

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const getPosts = async (req, res) => {
    const page = toPage(req.query.page)
    try {
        const startIndex = (page - 1) * LIMIT // get the starting index of every page
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({ data: posts, currentPage: page, numberOfPages: Math.ceil(total / LIMIT) })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await PostMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// A single query matches posts whose title contains it OR that have any of its words as a tag
// ("#" optional). An explicit comma-separated `tags` param is used instead when given.
// searchQuery "none" means "tags only".
export const getPostsBySearch = async (req, res) => {
    const { tags = '' } = req.query
    const searchQuery = (req.query.searchQuery || '').trim()
    const page = toPage(req.query.page)
    try {
        const hasTitleQuery = searchQuery && searchQuery !== 'none'
        const tagSource = tags.trim() ? tags.split(',') : (hasTitleQuery ? searchQuery.split(/[\s,]+/) : [])
        const tagTerms = tagSource.map((t) => t.trim().replace(/^#/, '')).filter(Boolean)

        const conditions = []
        if (hasTitleQuery) conditions.push({ title: new RegExp(escapeRegex(searchQuery.replace(/#/g, '').trim()), 'i') })
        // stored tags can carry stray spaces (" moon"), so match them loosely and case-insensitively
        if (tagTerms.length) conditions.push({ tags: { $in: tagTerms.map((t) => new RegExp(`^\\s*${escapeRegex(t)}\\s*$`, 'i')) } })

        if (!conditions.length) return res.json({ data: [], currentPage: 1, numberOfPages: 0 })

        const filter = { $or: conditions }
        const total = await PostMessage.countDocuments(filter)
        const posts = await PostMessage.find(filter).sort({ _id: -1 }).limit(LIMIT).skip((page - 1) * LIMIT)

        res.json({ data: posts, currentPage: page, numberOfPages: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id
    const post = req.body

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id

    try {
        await PostMessage.findByIdAndDelete(id)
        res.json({ message: "Post Deleted Successfully" })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const likePost = async (req, res) => {
    const id = req.params.id
    if (!req.userId) return res.json({ message: "Unauthenticated" })

    try {
        const post = await PostMessage.findById(id)

        const index = post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

        res.json(updatedPost)

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params
    const text = (req.body.text || '').trim()
    if (!req.userId) return res.status(401).json({ message: "Unauthenticated" })
    if (!text) return res.status(400).json({ message: "Comment can't be empty" })
    if (text.length > 1000) return res.status(400).json({ message: "Comment is too long (max 1000 characters)" })

    try {
        // the author comes from the auth token, not the request body, so names can't be spoofed
        let name = req.userName
        if (!name && mongoose.Types.ObjectId.isValid(req.userId)) {
            name = (await User.findById(req.userId))?.name
        }

        const comment = {
            _id: new mongoose.Types.ObjectId().toString(),
            authorId: String(req.userId),
            name: name || 'Unknown user',
            text,
            createdAt: new Date().toISOString(),
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true })
        if (!updatedPost) return res.status(404).json({ message: "Post not found" })

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// The comment's author or the post's creator can delete it.
export const deleteComment = async (req, res) => {
    const { id, commentId } = req.params
    if (!req.userId) return res.status(401).json({ message: "Unauthenticated" })

    try {
        const post = await PostMessage.findById(id)
        if (!post) return res.status(404).json({ message: "Post not found" })

        const comment = post.comments.find((c) => c && c._id === commentId)
        if (!comment) return res.status(404).json({ message: "Comment not found" })

        const userId = String(req.userId)
        if (comment.authorId !== userId && post.creator !== userId) {
            return res.status(403).json({ message: "You can't delete this comment" })
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { $pull: { comments: { _id: commentId } } }, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}