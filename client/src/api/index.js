import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
} );

// Posts

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const filterPosts = () => API.get('/posts/search')

// Auth

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// User

export const getUser = (id) => API.get(`/user/${id}`);
export const followUser = (id) => API.patch(`/user/${id}/followUser`);
export const getFollows = (id) => API.get(`user/${id}/getFollows`);
export const getFollowers = (id) => API.get(`user/${id}/getFollowers`);