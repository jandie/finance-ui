import {AUTH_CHANGE} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case AUTH_CHANGE:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}