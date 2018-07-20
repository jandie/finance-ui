import axios from 'axios';
import {API_URL} from "../config";
import {createAuth, handleResponseError} from "./util";

export const PAYMENTS_FETCHING = 'PAYMENTS_FETCHING';
export const PAYMENTS_FETCHED = 'PAYMENTS_FETCHED';

export const fetchPayments = (token) => dispatch => {
    const url = `${API_URL}payments/`;

    dispatch({
        type:PAYMENTS_FETCHING,
        payload:true
    });

    axios.get(url, createAuth(token)).then(res => {
        dispatch({
            type: PAYMENTS_FETCHED,
            payload: res.data
        })
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};