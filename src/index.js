import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import Root from './Root';
import reducers from './reducers'
import Login from './components/auth/Login';
import Balances from './components/balance/BalanceList';
import Overview from "./components/overview/Overview";
import Payments from './components/payment/PaymentList';

const initialState = {
    appDrawer: {
        open: false
    },
    auth: {
        token: localStorage.getItem('token')
    }
}

ReactDOM.render(
    <Root initialState={initialState}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/dashboard/balances"} exact component={Balances}/>
                    <Route path={"/dashboard/overview"} exact component={Overview}/>
                    <Route path={"/dashboard/payments/outgoing/:outgoing(true|false)"} exact component={Payments}/>

                    <Route path={''} component={Overview}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Root>
    ,
    document.getElementById('root'));
