import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {changeAppDrawer} from "../actions/appDrawer";
import {changeAuth} from "../actions/auth";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: 'inherit',
        textDecoration: 'none'
    },
};

class ButtonAppBar extends Component {

    toggleAppBar = () => {
        this.props.changeAppDrawer(!this.props.open);
    };

    renderLoginLogout = () => {
        const {classes} = this.props;
        return this.props.token === null ?
            <Button className={classes.menuButton}
                    onClick={() => {
                        this.props.changeAuth(null);
                        localStorage.setItem('token', null);
                    }}>
                Logout
            </Button> :
            <Link to={'/login'} className={classes.menuButton} >
                <Button color={'inherit'}>
                    Login
                </Button>
            </Link>
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.toggleAppBar}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            WhatPays.Me
                        </Typography>

                        {this.renderLoginLogout()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        open: state.appDrawer.open
    }
}

export default compose(
    connect(mapStateToProps, {
        changeAppDrawer,
        changeAuth
    }),
    withStyles(styles)
)(ButtonAppBar);
