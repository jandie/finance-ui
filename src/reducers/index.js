import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthenticationReducer from './auth';
import BalanceReducer from './balance';
import AppBarReducer from './appBar';

export default combineReducers({
    appBar: AppBarReducer,
    balances: BalanceReducer,
    auth: AuthenticationReducer,
    form: formReducer
});