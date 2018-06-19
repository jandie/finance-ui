import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthenticationReducer from './auth';

export default combineReducers({
    auth: AuthenticationReducer,
    form: formReducer
});