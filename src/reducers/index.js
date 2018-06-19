import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthenticationReducer from './auth';
import BalanceReducer from './balance';

export default combineReducers({
    balances: BalanceReducer,
    auth: AuthenticationReducer,
    form: formReducer
});