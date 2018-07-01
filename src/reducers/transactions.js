import _ from 'lodash';
import {TRANSACTIONS_FETCHED, TRANSACTIONS_FETCHING} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case TRANSACTIONS_FETCHING:
            return {
                transactions: {...state.transactions},
                fetching: action.payload
            };
        case TRANSACTIONS_FETCHED:
            return{
                transactions: _.mapKeys(action.payload, 'id'),
                fetching: false
            };
        default:
            return state;
    }
};