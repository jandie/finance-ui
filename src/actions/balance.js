import axios from "axios/index";
import {API_URL} from "../config";
import {handleResponseError} from "./util";

export const BALANCES_FETCHED = 'BALANCES_FETCHED';
export const BALANCE_ADDED = 'BALANCE_ADDED';
export const BALANCE_DELETED = 'BALANCE_DELETED';
export const BALANCES_FETCHING = 'BALANCES_FETCHING';

export const fetchBalances = () => dispatch => {
    const url = `${API_URL}balances/`;

    dispatch({
        type: BALANCES_FETCHING,
        payload: true
    });

    axios.get(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCES_FETCHED,
            payload: res.data
        });
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const addBalance = balance => dispatch => {
    const url = `${API_URL}balances/`;

    axios.post(url, balance, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCE_ADDED,
            payload: res.data
        });
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const editBalance = (id, balance) => dispatch => {
    const url = `${API_URL}balances/${id}/`;

    axios.put(url, balance, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: BALANCE_ADDED,
            payload: res.data
        });
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
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