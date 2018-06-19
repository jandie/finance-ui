import _ from 'lodash';

import {BALANCE_ADDED, BALANCE_DELETED, BALANCES_FETCHED} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case BALANCES_FETCHED:
            return _.mapKeys(action.payload, 'id');
        case BALANCE_ADDED:
            return {...state, [action.payload.id]: action.payload};
        case BALANCE_DELETED:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}