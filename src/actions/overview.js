import axios from 'axios';
import {API_URL} from "../config";
export const OVERVIEW_FETCHING = 'OVERVIEW_FETCHING';
export const OVERVIEW_FETCHED = 'OVERVIEW_FETCHED';

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