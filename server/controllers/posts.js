import PostMessage from "../models/postMesaage.js"

export const getPosts = async (req, res) => {
    const { page } = req.query
    try {

        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT // get the starting index of every page
        const total = await PostMessage.countDocuments({})


        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })

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

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    console.log(searchQuery, tags);
    try {
        const title = new RegExp(searchQuery, 'i') // case insensitive
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

        res.json({ data: posts })
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
    const { value } = req.body
    try {
        const post = await PostMessage.findById(id)
        post.comments.push(value)

        const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new:true})

        res.status(200).send(updatedPost)

    } catch (error) {
        res.json({ message: error.message })
    }


}