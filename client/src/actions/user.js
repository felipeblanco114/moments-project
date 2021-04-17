import * as api from '../api';
import { FETCH_USER } from '../constants/actionTypes';

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.getUser();

        dispatch({ type: FETCH_USER, payload: data })
    } catch (error) {
        console.log(error);
    }
};