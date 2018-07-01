export const APP_BAR_CHANGE = 'app_bar_change';

export const changeAppDrawer = open => dispatch => {
    dispatch({
        type: APP_BAR_CHANGE,
        payload: open
    });
};