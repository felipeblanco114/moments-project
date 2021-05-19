import * as api from '../api';
import { FETCH_USER, UPDATE_USER } from '../constants/actionTypes';

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.getUser();

        dispatch({ type: FETCH_USER, payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const followUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.followUser(id);

        dispatch({ type: UPDATE_USER, payload: data })
    } catch (error) {
        console.log(error);
    }
};

