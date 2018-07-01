import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers'
import Login from './components/auth/Login';
import Balances from './components/balance/BalanceList';
import Overview from "./components/overview/Overview";

const store = createStore(
    reducers,
    {
        appDrawer: {
            open: false
        }
    },
    applyMiddleware(
        reduxThunk
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path={"/login"} component={Login} />
                    <Route path={"/dashboard/balances"} exact component={Balances} />
                    <Route path={"/dashboard/overview"} exact component={Overview} />
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));
