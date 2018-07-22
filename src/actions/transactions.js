import {API_URL} from "../config";
import axios from "axios/index";
import {createAuth, dispatchSnack, handleResponseError} from "./util";

export const TRANSACTIONS_FETCHING = 'TRANSACTIONS_FETCHING';
export const TRANSACTIONS_FETCHED = 'TRANSACTIONS_FETCHED';
export const TRANSACTION_EDITED = 'TRANSACTION_EDITED';
export const TRANSACTION_DELETED = 'TRANSACTION_DELETED';
export const TRANSACTION_ADDED = 'TRANSACTION_ADDED';

export const addTransaction = (transaction, paymentId, token, callback) => dispatch => {
  const url = `${API_URL}payments/${paymentId}/transactions/`;

  axios.post(url, transaction, createAuth(token)).then(res => {
      dispatch({
          type: TRANSACTION_ADDED,
          payload: res.data
      });
      dispatchSnack(dispatch, 'Transaction added');
      callback();
  }).catch(error => {
      console.log(error);
      handleResponseError(dispatch, error.response,
          'Error: Adding transaction failed');
  })
};

export const fetchTransactions = (token) => dispatch => {
    const url = `${API_URL}transactions/`;

    dispatch({
        type:TRANSACTIONS_FETCHING,
        payload: true
    });

    axios.get(url, createAuth(token)).then(res => {
        dispatch({
            type: TRANSACTIONS_FETCHED,
            payload: res.data
        })
    }).catch(error => {
        handleResponseError(dispatch, error.response,
            'Error: Fetching transactions failed');
    })
};

export const editTransaction = (transaction, token, callback) => dispatch => {
    const url = `${API_URL}transactions/${transaction.id}/`;

    axios.put(url, transaction, createAuth(token)).then(res => {
        dispatch({
            type: TRANSACTION_EDITED,
            payload: res.data
        });
        dispatchSnack(dispatch, 'Transaction edited');
        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response,
            'Error: Editing transaction failed');
    })
};

export const deleteTransaction = (id, token, callback) => dispatch => {
    const url = `${API_URL}transactions/${id}/`;

    axios.delete(url, createAuth(token)).then(res => {
        dispatch({
            type: TRANSACTION_DELETED,
            payload: id
        });
        dispatchSnack(dispatch, 'Transaction deleted');
        callback();
    }).catch(error => {
        handleResponseError(dispatch, error.response,
            'Error: Deleting transaction failed');
    })
};