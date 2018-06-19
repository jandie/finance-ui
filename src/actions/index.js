import axios from 'axios';
import {AUTH_CHANGE, AUTH_ERROR} from "./types";

const API_URL = 'http://localhost:8000/';

export const login = (credentails, callback) => dispatch => {
    const url = `${API_URL}api-token-auth/`;
    axios.post(url, credentails).then(response => {
        dispatch({
            type: AUTH_CHANGE,
            payload: response.data.token
        });

        localStorage.setItem('token', response.data.token);
        callback();
    }).catch(error => {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Combination of username and password does not exist'
        });
    });
};