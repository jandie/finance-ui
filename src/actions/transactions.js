import {API_URL} from "../config";
import axios from "axios/index";
import {handleResponseError} from "./util";

export const TRANSACTIONS_FETCHING = 'TRANSACTIONS_FETCHING';
export const TRANSACTIONS_FETCHED = 'TRANSACTIONS_FETCHED';
export const TRANSACTION_EDITED = 'TRANSACTION_EDITED';
export const TRANSACTION_DELETED = 'TRANSACTION_DELETED';
export const TRANSACTION_ADDED = 'TRANSACTION_ADDED';

export const addTransaction = (transaction, paymentId, callback) => dispatch => {
  const url = `${API_URL}payments/${paymentId}/transactions/`;

  axios.post(url, transaction, {
      headers:{
          Authorization: `JWT ${localStorage.getItem('token')}`
      }
  }).then(res => {
      dispatch({
          type: TRANSACTION_ADDED,
          payload: res.data
      });

      callback();
  }).catch(error => {
      handleResponseError(dispatch, error.response.status);
  })
};

export const fetchTransactions = () => dispatch => {
    const url = `${API_URL}transactions/`;

    dispatch({
        type:TRANSACTIONS_FETCHING,
        payload: true
    });

    axios.get(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: TRANSACTIONS_FETCHED,
            payload: res.data
        })
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const editTransaction = (transaction, callback) => dispatch => {
    const url = `${API_URL}transactions/${transaction.id}/`;

    axios.put(url, transaction, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: TRANSACTION_EDITED,
            payload: res.data
        });

        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};

export const deleteTransaction = (id, callback) => dispatch => {
    const url = `${API_URL}transactions/${id}/`;

    axios.delete(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: TRANSACTION_DELETED,
            payload: id
        });

        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};