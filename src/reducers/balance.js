import _ from 'lodash';

import {BALANCE_ADDED, BALANCE_DELETED, BALANCES_FETCHED, BALANCES_FETCHING} from "../actions/balance";

export default (state = {}, action) => {
    switch (action.type) {
        case BALANCES_FETCHING:
            return {
                balances: {...state.balances},
                loading: action.payload
            };
        case BALANCES_FETCHED:
            return {
                balances: _.mapKeys(action.payload, 'id'),
                loading: false
            };
        case BALANCE_ADDED:
            return {
                balances: {...state.balances, [action.payload.id]: action.payload},
                loading: false
            };
        case BALANCE_DELETED:
            return {
                balances: _.omit(state.balances, action.payload),
                loading: false
            };
        default:
            return state;
    }
}