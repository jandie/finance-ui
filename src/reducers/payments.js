import _ from 'lodash';
import {PAYMENT_DELETED, PAYMENT_FETCHED, PAYMENTS_FETCHED, PAYMENTS_FETCHING} from "../actions/payments";

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
        case PAYMENT_FETCHED:
            return{
                payments: { ...state.payments, [action.payload.id]: action.payload },
                fetching: state.fetching
            };
        case PAYMENT_DELETED:
            return{
                payments: _.omit(state.payments, action.payload),
                fetching: state.fetching
            };
        default:
            return state;
    }
}