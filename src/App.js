import React, {Component} from 'react';
import AppBar from './components/AppBar';
import Snackbar from './components/Snackbar';
import AppDrawer from "./components/AppDrawer";

import {withStyles} from '@material-ui/core/styles';

const styles = {
    container: {
        backgroundColor: 'inherit',
        width: '100%',
        height: '100%'
    },
    filler: {
        height: '400px',
        backgroundColor: 'inherit'
    },
    children: {
        marginTop: '20px',
        width: '100%',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class App extends Component {
    render() {
        const {classes} = this.props;
        return(
            <div className={classes.container}>
                <AppBar/>
                <AppDrawer/>
                <div className={classes.children}>
                    {this.props.children}
                    <div className={classes.filler}>
                </div>

                </div>
                <Snackbar/>
            </div>
        );
    }
}

export default withStyles(styles) (App);
