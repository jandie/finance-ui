import {AUTH_CHANGE, AUTH_ERROR} from "./types";
import axios from "axios/index";
import {API_URL} from "../config";

export const login = (credentails, callback) => dispatch => {
    const url = `${API_URL}api-token-auth/`;
    return axios.post(url, credentails).then(response => {
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