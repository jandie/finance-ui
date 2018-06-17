import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers'

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

            </App>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();
