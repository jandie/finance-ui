import axios from 'axios';
import {API_URL} from "../config";
import {handleResponseError} from "./util";

export const PAYMENTS_FETCHING = 'PAYMENTS_FETCHING';
export const PAYMENTS_FETCHED = 'PAYMENTS_FETCHED';

export const fetchPayments = () => dispatch => {
    const url = `${API_URL}payments/`;

    dispatch({
        type:PAYMENTS_FETCHING,
        payload:true
    });

    axios.get(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: PAYMENTS_FETCHED,
            payload: res.data
        })
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};