import {APP_BAR_CHANGE} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case APP_BAR_CHANGE:
            return {
                open: action.payload
            };
        default:
            return state;
    }
}