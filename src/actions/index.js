import axios from 'axios';
import {
    AUTH_CHANGE,
    AUTH_ERROR,
    BALANCES_FETCHED,
    BALANCE_ADDED,
    BALANCE_DELETED, BALANCES_FETCHING
} from "./types";

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

    dispatch({
        type: BALANCES_FETCHING,
        payload: true
    });

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

export const addBalance = balance => dispatch => {
    const url = `${API_URL}balances/`;

    return axios.post(url, balance, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCE_ADDED,
            payload: res.data
        });
    })
};

export const editBalance = (id, balance) => dispatch => {
    const url = `${API_URL}balances/${id}/`;

    return axios.put(url, balance, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCE_ADDED,
            payload: res.data
        });
    })
};

export const deleteBalance = id => dispatch => {
    const url = `${API_URL}balances/${id}/`;

    return axios.delete(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCE_DELETED,
            payload: id
        });
    })
};