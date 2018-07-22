import React from 'react';
import AppBar from './components/AppBar';
import AppDrawer from './components/AppDrawer';
import Snackbar from './components/Snackbar';

export default ({ children }) => {
    return(
        <div>
            <AppBar/>
            <AppDrawer/>
            {children}
            <Snackbar/>
        </div>
    );
}
