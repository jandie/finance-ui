import axios from "axios/index";
import {API_URL} from "../config";
import {dispatchSnack} from "./util";

export const AUTH_CHANGE = 'AUTH_CHANGE';
export const AUTH_ERROR = 'AUTH_ERROR';

export const login = (credentails, callback) => dispatch => {
    const url = `${API_URL}api-token-auth/`;
    return axios.post(url, credentails).then(response => {
        dispatch({
            type: AUTH_CHANGE,
            payload: response.data.token
        });

        localStorage.setItem('token', response.data.token);
        dispatchSnack(dispatch, 'Loged in successfully');
        callback();
    }).catch(error => {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Combination of username and password does not exist'
        });
        dispatchSnack(dispatch, 'Wrong username or password');
    });
};

export const changeAuth = (token) => dispatch => {
    dispatch({
        type: AUTH_CHANGE,
        payload: token
    });
};