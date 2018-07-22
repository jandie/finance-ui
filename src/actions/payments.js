import axios from 'axios';
import {API_URL} from "../config";
import {createAuth, dispatchSnack, handleResponseError} from "./util";

export const PAYMENTS_FETCHING = 'PAYMENTS_FETCHING';
export const PAYMENTS_FETCHED = 'PAYMENTS_FETCHED';

export const PAYMENT_FETCHED = 'PAYMENT_FETCHED';
export const PAYMENT_DELETED = 'PAYMENT_DELETED';

export const fetchPayments = (token) => dispatch => {
    const url = `${API_URL}payments/`;

    dispatch({
        type: PAYMENTS_FETCHING,
        payload: true
    });

    axios.get(url, createAuth(token)).then(res => {
        dispatch({
            type: PAYMENTS_FETCHED,
            payload: res.data
        })
    }).catch(error => {
        handleResponseError(dispatch, error.response.status,
            'Error: Fetching payments failed');
    })
};

export const addPayment = (payment, token, callback = () => {
}) => dispatch => {
    const url = `${API_URL}payments/`;

    axios.post(url, payment, createAuth(token)).then(res => {
        dispatch({
            type: PAYMENT_FETCHED,
            payload: res.data
        });
        dispatchSnack(dispatch, 'Payment added');
        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response.status,
            'Error: Adding payment failed');
    })
};

export const editPayment = (payment, token, callback = () => {
}) => dispatch => {
    const url = `${API_URL}payments/${payment.id}/`;

    axios.put(url, payment, createAuth(token)).then(res => {
        dispatch({
            type: PAYMENT_FETCHED,
            payload: payment
        });
        dispatchSnack(dispatch, 'Payment edited');
        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response.status,
            'Error: Editing payment failed');
    })
};

export const deletePayment = (id, token, callback = () => {
}) => dispatch => {
    const url = `${API_URL}payments/${id}/`;

    axios.delete(url, createAuth(token)).then(res => {
        dispatch({
            type: PAYMENT_DELETED,
            payload: id
        });
        dispatchSnack(dispatch, 'Payment deleted');
        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response.status,
            'Error: Deleting payment failed');
    })
};