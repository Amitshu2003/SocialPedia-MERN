import React, { useState } from 'react'
import myContext from './MyContext'
import * as api from "../api/index"

const ContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState()

    // signin/signup return an error message for the UI, or null on success
    const signin = async (formData, navigate) => {
        try {
            // login in the user
            const { data } = await api.signIn(formData)
            localStorage.setItem('profile', JSON.stringify(data))
            navigate("/")
            return null
        } catch (error) {
            console.log(error);
            return error.response?.data?.message || 'Something went wrong. Please try again.'
        }
    }

    const signup = async (formData, navigate) => {
        try {
            // sign up the user
            const { data } = await api.signUp(formData)
            localStorage.setItem('profile', JSON.stringify(data))
            navigate("/")
            return null
        } catch (error) {
            console.log(error);
            return error.response?.data?.message || 'Something went wrong. Please try again.'
        }
    }

    const createPost = async (post) => {
        try {
            await api.createPost(post)
            // newest posts come first, so reload page 1 to show it with correct page counts
            await getPosts(1)
        } catch (error) {
            console.log(error.message);
        }
    }


    const updatePost = async (id, updatedPost) => {
        try {
            const { data } = await api.updatePost(id, updatedPost)
            const newPosts = posts.map((post) => post._id === data._id ? data : post)
            setPosts(newPosts)
        } catch (error) {
            console.log(error.message);
        }
    }


    const getPosts = async (page) => {
        try {
            setIsLoading(true)
            const { data } = await api.fetchPosts(page)
            setPosts(data.data)
            setCurrentPage(data.currentPage)
            setNumberOfPages(data.numberOfPages)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getPostBySearch = async (searchQuery) => {
        try {
            setIsLoading(true)
            const { data } = await api.fetchPostsBySearch(searchQuery)
            setPosts(data.data)
            setCurrentPage(data.currentPage)
            setNumberOfPages(data.numberOfPages)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }


    const likePost = async (id) => {
        try {
            const { data } = await api.likePost(id)
            if (!data?._id) return null
            syncPost(data)
            return data
        } catch (error) {
            console.log(error.message);
            return null
        }
    }

    const deletePost = async (id) => {
        try {
            await api.deletePost(id)
            let newPosts = posts.filter((post) => post._id !== id)
            setPosts(newPosts)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getPost = async (id) => {
        try {
            setIsLoading(true)
            const { data } = await api.fetchPost(id)
            setPost(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }

    // Replace a post everywhere it's held (feed list + open post) with the server's copy.
    const syncPost = (data) => {
        setPosts((prev) => prev.map((post) => post._id === data._id ? data : post))
        setPost((prev) => prev?._id === data._id ? data : prev)
    }

    const commentPost = async (text, id) => {
        try {
            const { data } = await api.comment(text, id)
            syncPost(data)
            return data
        } catch (error) {
            console.log(error.message);
            return null
        }
    }

    const deleteComment = async (id, commentId) => {
        try {
            const { data } = await api.deleteComment(id, commentId)
            syncPost(data)
            return data
        } catch (error) {
            console.log(error.message);
            return null
        }
    }


    return (
        <myContext.Provider value={{ posts, post, getPosts, getPostBySearch, likePost, deletePost, commentPost, deleteComment, getPost, isLoading, currentPage, numberOfPages, signin, signup, createPost, updatePost }}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider