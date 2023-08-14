import React, { useState } from 'react'
import myContext from './MyContext'
import * as api from "../api/index"

const ContextProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState()

    const signin = async (formData, navigate) => {
        try {
            // login in the user
            const { data } = await api.signIn(formData)
            localStorage.setItem('profile', JSON.stringify(data))
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const signup = async (formData, navigate) => {
        try {
            // sign up the user
            const { data } = await api.signUp(formData)
            localStorage.setItem('profile', JSON.stringify(data))
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    const createPost = async (post) => {
        try {
            const data = await api.createPost(post)
            setPosts(posts.concat(data))

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
            const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
            setPosts(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error.message);
        }
    }


    const likePost = async (id) => {
        try {
            const { data } = await api.likePost(id)
            let newPosts = posts.map((post) => post._id === data._id ? data : post)
            setPosts(newPosts)
        } catch (error) {
            console.log(error.message);
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

    const commentPost = async (value, id) => {
        try {
            const { data } = await api.comment(value, id)
            let newPosts = posts.map((post) => post._id === data._id ? data : post)
            setPosts(newPosts)
            return data.comments
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <myContext.Provider value={{ posts, post, getPosts, getPostBySearch, likePost, deletePost, commentPost, getPost, isLoading, currentPage, numberOfPages, signin, signup, createPost, updatePost }}>
            {children}
        </myContext.Provider>
    )
}

export default ContextProvider