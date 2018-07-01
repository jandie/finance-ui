import _ from 'lodash';
import {
    TRANSACTION_DELETED,
    TRANSACTION_EDITED,
    TRANSACTIONS_FETCHED,
    TRANSACTIONS_FETCHING
} from "../actions/transactions";

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
        case TRANSACTION_EDITED:
            return {
                transactions: { ...state.transactions, [action.payload.id]:action.payload},
                fetching: state.fetching
            };
        case TRANSACTION_DELETED:
            return {
                transactions: _.omit(state.transactions, action.payload),
                fetching: state.fetching
            };
        default:
            return state;
    }
};