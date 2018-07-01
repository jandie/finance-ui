import React from 'react';
import AppBar from './components/AppBar';
import AppDrawer from './components/AppDrawer';

export default ({ children }) => {
    return(
        <div>
            <AppBar/>
            <AppDrawer/>
            {children}
        </div>
    );
}
