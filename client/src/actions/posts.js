import * as api from '../api';      // Import everything from api/index.js
import { FETCH_ALL, CREATE, UPDATE, DELETE, FILTER } from '../constants/actionTypes';
// ACTIONS CREATORS => FUNCTIONS that return ACTIONS => ACTION it's an OBJECT that has TYPE and PAYLOAD

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();        // Data represents the posts

        dispatch({ type: FETCH_ALL, payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
};