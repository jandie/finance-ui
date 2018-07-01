import _ from 'lodash';
import {PAYMENTS_FETCHED, PAYMENTS_FETCHING} from "../actions/payments";

export default (state={}, action) => {
    switch (action.type) {
        case PAYMENTS_FETCHING:
            return {
                payments: {...state.payments},
                fetching: action.payload
            };
        case PAYMENTS_FETCHED:
            return {
                payments: _.mapKeys(action.payload, 'id'),
                fetching: false
            };
        default:
            return state;
    }
}