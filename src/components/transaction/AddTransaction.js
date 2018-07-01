import React, {Component} from 'react';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'lodash';

import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const style = {
    field: {
        width: '90%',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '15px',
    },
    button: {
        marginRight: '15px',
        marginTop: '10px',
    },
};

class AddTransaction extends Component {
    componentDidMount() {
        this.props.fetchBalances();
        this.props.fetchPayments();
    }

    renderField = ({input, label, meta: {touched, error}, ...custom}, type) => {
        const {classes} = this.props;
        return (
            <TextField
                label={label}
                autoComplete="none"
                type={type}
                className={classes.field}
                {...input}
                {...custom}
            />
        );
    };

    onSubmit = (balance) => {
        // this.props.addBalance(balance).then(() => {
        //     this.props.closeNewBalance();
        //     this.props.reset();
        // });
    };

    render() {
        const {handleSubmit, classes, payments, balances} = this.props;
        if ((_.size(payments.payments) === 0 && payments.fetching) ||
            (_.size(balances.balances) === 0 && balances.fetching))
            return <LinearProgress/>;

        if (_.size(payments.payments) === 0 ||
            _.size(balances.balances) === 0)
            return (
                <CardContent>
                    <Typography>
                        You don't have any payments or balances, please add them.
                    </Typography>
                </CardContent>
            );

        return (
            <CardContent>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        name={"description"}
                        label={"Description"}
                        type={'normal'}
                        component={this.renderField}
                    />
                    <Field
                        name={"amount"}
                        label={"Amount"}
                        type={'number'}
                        component={this.renderField}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type={'submit'}
                        className={classes.button}>
                        Add balance
                    </Button>
                    <Button variant="contained"
                            onClick={this.props.onCancel}
                            className={classes.button}>
                        Cancel
                    </Button>
                </form>
            </CardContent>
        );
    }
}

export default compose(
    withStyles(style),
    reduxForm({
        form: 'addTransaction'
    })
)(AddTransaction)
