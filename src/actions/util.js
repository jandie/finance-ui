import {AUTH_CHANGE} from "./auth";

export const createAuth = (token) => {
    return {
        headers: {
            Authorization: token
        }
    }
};

export const handleResponseError = (dispatch, status) => {
    console.log(status);
    switch (status) {
        case 401:
            dispatch({
                type: AUTH_CHANGE,
                payload: null
            });
            localStorage.setItem('token', null);
            break;
    }
};

// export const dispatchSnack = (dispatch, info) => {
//     dispatch({
//         type: SNACKBAR_UPDATE,
//         payload: {open: true, text: info}
//     })
// };