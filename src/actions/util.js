import {AUTH_CHANGE} from "./auth";
import {SNACKBAR_UPDATE} from "./snackbar";

export const createAuth = (token) => {
    return {
        headers: {
            Authorization: `JWT ${token}`
        }
    }
};

export const handleResponseError = (dispatch, response, defaultMessage = 'Something went wrong, please try again') => {
    let status = response !== undefined ? response.status : -1;

    switch (status) {
        case 401:
            dispatch({
                type: AUTH_CHANGE,
                payload: null
            });
            localStorage.setItem('token', null);
            dispatchSnack(dispatch, 'Session expired, please login again');
            break;
        default:
            dispatchSnack(dispatch, defaultMessage);
            return;
    }
};

export const dispatchSnack = (dispatch, info) => {
    dispatch({
        type: SNACKBAR_UPDATE,
        payload: {open: true, text: info}
    })
};