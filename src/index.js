import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'
import Login from './components/auth/Login';
import Balances from './components/balance/BalanceList';

const store = createStore(
    reducers,
    {

    },
    applyMiddleware(
        reduxThunk
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path={"/login"} component={Login} />
                <Route path={"/dashboard/balances"} exact component={Balances} />
            </App>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));
