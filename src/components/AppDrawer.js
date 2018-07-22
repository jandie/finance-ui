import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import HomeIcon from '@material-ui/icons/Home';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import Blue from '@material-ui/core/colors/blue';
import Green from '@material-ui/core/colors/green';
import Red from '@material-ui/core/colors/red';

import {compose} from "redux";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'

import {changeAppDrawer} from "../actions/appDrawer";

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    balanceIcon: {
        color: Blue[600]
    },
    expenseIcon: {
        color: Red[500]
    },
    incomeIcon: {
        color: Green[500]
    },
    link: {
        textDecoration: 'none'
    },
    whiteSpace: {
        width: '100%',
        height: '60px'
    }
});

class AppDrawer extends React.Component {
    toggleDrawer = (open) => () => {
        this.props.changeAppBar(open);
    };

    render() {
        const {classes} = this.props;

        const sideList = (
            <div className={classes.list}>
                <div className={classes.whiteSpace}/>
                <Link to={'/dashboard/overview'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Overview"/>
                    </ListItem>
                </Link>

                <Link to={'/dashboard/balances'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountBalanceIcon
                                className={classes.balanceIcon}/>
                        </ListItemIcon>
                        <ListItemText primary="Balances"/>
                    </ListItem>
                </Link>

                <Link to={'/dashboard/payments/outgoing/true'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ArrowUpIcon className={classes.expenseIcon}/>
                        </ListItemIcon>
                        <ListItemText primary="Expenses"/>
                    </ListItem>
                </Link>

                <Link to={'/dashboard/payments/outgoing/false'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ArrowDownIcon className={classes.incomeIcon}/>
                        </ListItemIcon>
                        <ListItemText primary="Incomes"/>
                    </ListItem>
                </Link>
            </div>
        );

        return (
            <Drawer open={this.props.open} onClose={this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={this.toggleDrawer(false)}
                    onClick={this.toggleDrawer(false)}
                >
                    {sideList}
                </div>
            </Drawer>
        );
    }
}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        open: state.appDrawer.open
    }
}

export default compose(
    connect(mapStateToProps, {changeAppBar: changeAppDrawer}),
    withStyles(styles)
)(AppDrawer);
