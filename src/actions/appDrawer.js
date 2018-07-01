import {APP_BAR_CHANGE} from "./types";

export const changeAppDrawer = open => dispatch => {
    dispatch({
        type: APP_BAR_CHANGE,
        payload: open
    });
};