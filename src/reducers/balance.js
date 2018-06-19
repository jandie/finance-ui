import _ from 'lodash';

import {BALANCES_FETCHED} from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case BALANCES_FETCHED:
            return _.mapKeys(action.payload, 'id');
        default:
            return state;
    }
}