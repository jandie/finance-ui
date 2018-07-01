import {OVERVIEW_FETCHED, OVERVIEW_FETCHING} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case OVERVIEW_FETCHED:
            return {
                overview: {...action.payload},
                fetching: false
            };
        case OVERVIEW_FETCHING:
            return {
                overview: {...state.overview},
                fetching: false
            };
        default:
            return state;
    }
}