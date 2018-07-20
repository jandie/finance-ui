import axios from "axios/index";
import {API_URL} from "../config";
import {createAuth, handleResponseError} from "./util";

export const BALANCES_FETCHED = 'BALANCES_FETCHED';
export const BALANCE_ADDED = 'BALANCE_ADDED';
export const BALANCE_DELETED = 'BALANCE_DELETED';
export const BALANCES_FETCHING = 'BALANCES_FETCHING';

export const fetchBalances = (token) => dispatch => {
    const url = `${API_URL}balances/`;

    dispatch({
        type: BALANCES_FETCHING,
        payload: true
    });

    axios.get(url, createAuth(token)).then(res => {
        dispatch({
            type: BALANCES_FETCHED,
            payload: res.data
        });
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const addBalance = (balance, token) => dispatch => {
    const url = `${API_URL}balances/`;

    axios.post(url, balance, createAuth(token)).then(res => {
        dispatch({
            type: BALANCE_ADDED,
            payload: res.data
        });
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const editBalance = (id, balance, token, callback) => dispatch => {
    const url = `${API_URL}balances/${id}/`;

    axios.put(url, balance, createAuth(token)).then(res => {
        dispatch({
            type: BALANCE_ADDED,
            payload: res.data
        });

        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const deleteBalance = (id, token) => dispatch => {
    const url = `${API_URL}balances/${id}/`;

    return axios.delete(url, createAuth(token)).then(res => {
        dispatch({
            type: BALANCE_DELETED,
            payload: id
        });
    })
};