export const SNACKBAR_UPDATE = 'snackbar_open';

export const showSnack = (open, text) => dispatch => {
    dispatch({
        type: SNACKBAR_UPDATE,
        payload: {
            open,
            text
        }
    })
};