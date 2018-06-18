import React from 'react';
import AppBar from './components/AppBar';

export default ({ children }) => {
    return(
        <div>
            <AppBar/>
            {children}
        </div>
    );
}
