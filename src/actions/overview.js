import axios from 'axios';
import {API_URL} from "../config";
import {OVERVIEW_FETCHED, OVERVIEW_FETCHING} from "./types";

export const fetchOverview = () => dispatch => {
    const url = `${API_URL}users/overview/`;

    dispatch({
        type:OVERVIEW_FETCHING,
        payload: true
    });

    return axios.get(url, {
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then(res => {
        dispatch({
            type: OVERVIEW_FETCHED,
            payload: res.data
        })
    })
};