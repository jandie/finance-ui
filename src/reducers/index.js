import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthenticationReducer from './auth';
import BalanceReducer from './balance';
import AppDrawerReducer from './appDrawer';
import OverviewReducer from './overview';
import TransactionsReducer from './transactions';

export default combineReducers({
    transactions: TransactionsReducer,
    overview: OverviewReducer,
    appDrawer: AppDrawerReducer,
    balances: BalanceReducer,
    auth: AuthenticationReducer,
    form: formReducer
});