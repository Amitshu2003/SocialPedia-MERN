import axios from 'axios';

// Set REACT_APP_API_URL=http://localhost:5000 in client/.env to use a local server
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'https://socialpedia-backend-ifep.onrender.com' });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = (page = 1) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchPostsBySearch = ({ search, tags = '', page = 1 }) =>
  API.get('/posts/search', { params: { searchQuery: search || 'none', tags, page } })

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.put(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const comment = (text, id) => API.post(`/posts/${id}/commentPost`, { text })
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/comments/${commentId}`)

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
