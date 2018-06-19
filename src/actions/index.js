import axios from 'axios';
import {AUTH_CHANGE, AUTH_ERROR, BALANCES_FETCHED} from "./types";

const API_URL = 'http://localhost:8000/';

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


export const fetchBalances = () => dispatch => {
    const url = `${API_URL}balances/`;

    return axios.get(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCES_FETCHED,
            payload: res.data
        });
    })
};