import {API_URL} from "../config";
import axios from "axios/index";
import {TRANSACTION_DELETED, TRANSACTION_EDITED, TRANSACTIONS_FETCHED, TRANSACTIONS_FETCHING} from "./types";
import {fetchOverview} from "./overview";

export const fetchTransactions = () => dispatch => {
    const url = `${API_URL}transactions/`;

    dispatch({
        type:TRANSACTIONS_FETCHING,
        payload: true
    });

    return axios.get(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: TRANSACTIONS_FETCHED,
            payload: res.data
        })
    })
};

export const editTransaction = (transaction, callback) => dispatch => {
    const url = `${API_URL}transactions/${transaction.id}/`;

    return axios.put(url, transaction, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: TRANSACTION_EDITED,
            payload: res.data
        });

        fetchOverview();

        callback();
    })
};

export const deleteTransaction = (id, callback) => dispatch => {
    const url = `${API_URL}transactions/${id}/`;

    return axios.delete(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: TRANSACTION_DELETED,
            payload: id
        });

        fetchOverview();

        callback();
    })
};