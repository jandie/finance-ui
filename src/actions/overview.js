import axios from 'axios';
import {API_URL} from "../config";
import {createAuth, handleResponseError} from "./util";
export const OVERVIEW_FETCHING = 'OVERVIEW_FETCHING';
export const OVERVIEW_FETCHED = 'OVERVIEW_FETCHED';

export const fetchOverview = (token) => dispatch => {
    const url = `${API_URL}users/overview/`;

    dispatch({
        type:OVERVIEW_FETCHING,
        payload: true
    });

    axios.get(url, createAuth(token)).then(res => {
        dispatch({
            type: OVERVIEW_FETCHED,
            payload: res.data
        })
    }).catch(error => {
        handleResponseError(dispatch, error.response.status);
    })
};