import {SNACKBAR_UPDATE} from "../actions/snackbar";

export default (state = {}, action) => {
    switch (action.type) {
        case SNACKBAR_UPDATE:
            return {
                open: action.payload.open,
                text: action.payload.text
            };
        default:
            return state;
    }
}