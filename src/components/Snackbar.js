import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {showSnack} from "../actions/snackbar";

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class MySnackbar extends React.Component {
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.showSnack(false, '');
    };

    render() {
        const {classes} = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.snackbar.open}
                autoHideDuration={1000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.snackbar.text}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        snackbar: state.snackbar
    }
}

MySnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    connect(mapStateToProps, {showSnack}),
    withStyles(styles),
)(MySnackbar);
