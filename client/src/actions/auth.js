import * as api from '../api';      // Import everything from api/index.js
import { AUTH } from '../constants/actionTypes';

import swal from 'sweetalert';
// ACTIONS CREATORS => FUNCTIONS that return ACTIONS => ACTION it's an OBJECT that has TYPE and PAYLOAD

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        console.log(error);
        swal({
            title: "El usuario y la contraseña no coinciden",
            text: `${error}`,
            icon: "warning"
        });
    }
};

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}