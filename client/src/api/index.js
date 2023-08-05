// import axios from 'axios'

// const url = 'http://localhost:5000/posts'

// export const fetchPosts = ()=> axios.get(url)
// export const createPost = (newPost) => axios.post(url,newPost)
// export const updatePost = (id, updatedPost) => axios.put(`${url}/${id}`,updatedPost)
// export const deletePost = (id) => axios.delete(`${url}/${id}`)
// export const likePost =  (id) => axios.put(`${url}/${id}/likePost`)

// const authUrl = 'http://localhost:5000/users'

// export const signIn = (formData)=> axios.post(`${authUrl}/signin`,formData)
// export const signUp = (formData)=> axios.post(`${authUrl}/signup`,formData)


import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.put(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value })

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
