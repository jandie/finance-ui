import {API_URL} from "../config";
import axios from "axios/index";
import {TRANSACTIONS_FETCHED, TRANSACTIONS_FETCHING} from "./types";

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