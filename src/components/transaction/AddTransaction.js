import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';

import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
    Select,
    TextField
} from 'redux-form-material-ui';

import {addTransaction} from "../../actions/transactions";
import {fetchOverview} from "../../actions/overview";
import {editBalance} from "../../actions/balance";

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
        this.props.fetchBalances(this.props.token);
        this.props.fetchPayments(this.props.token);
    }

    onSubmit = (transaction) => {
        const newTransaction = {
            description: transaction.description,
            amount: transaction.amount
        };
        this.props.addTransaction(
            newTransaction,
            transaction.payment,
            this.props.token,
            () => {
                if (transaction.balance) {
                    const balance = this.props.balances.balances[transaction.balance];
                    const payment = this.props.payments.payments[transaction.payment];
                    balance.amount = payment.outgoing ?
                        parseFloat(balance.amount) - parseFloat(transaction.amount) :
                        parseFloat(balance.amount) + parseFloat(transaction.amount);
                    balance.amount.toFixed(2);
                    this.props.editBalance(balance.id, balance, this.props.token, () => {
                        this.props.fetchOverview(this.props.token);
                    })
                } else {
                    this.props.fetchOverview(this.props.token)
                }
            }
        )
    };

    renderBalanceOptions = () => {
        return _.map(this.props.balances.balances, balance => {
            return (
                <MenuItem key={balance.id} value={balance.id}>{balance.name}</MenuItem>
            );
        })
    };

    renderPaymentOptions = () => {
        return _.map(this.props.payments.payments, payment => {
            return (
                <MenuItem key={payment.id} value={payment.id}>{payment.name}</MenuItem>
            );
        });
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
                    <FormControl
                        className={classes.field}>
                        <InputLabel htmlFor="balance-simple">Balance</InputLabel>
                        <Field
                            label={'Balance'}
                            name="balance"
                            component={Select}
                            placeholder="Balance"
                            inputProps={{
                                name: 'balance',
                                id: 'balance-simple',
                            }}
                        >
                            {this.renderBalanceOptions()}
                        </Field>
                    </FormControl>
                    <FormControl
                        className={classes.field}>
                        <InputLabel htmlFor="payment-simple">Payment</InputLabel>
                        <Field
                            label={'Payment'}
                            name="payment"
                            component={Select}
                            placeholder="Payment"
                            inputProps={{
                                name: 'payment',
                                id: 'payment-simple',
                            }}
                        >
                            {this.renderPaymentOptions()}
                        </Field>
                    </FormControl>
                    <Field
                        label={'Amount'}
                        name="amount"
                        type={'number'}
                        component={TextField}
                        className={classes.field}/>
                    <Field
                        label={'Description'}
                        name="description"
                        component={TextField}
                        className={classes.field}/>
                    <Button
                        variant="contained"
                        color="primary"
                        type={'submit'}
                        className={classes.button}>
                        Add transaction
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

function mapStateToProps(state) {
    return {
        balances: state.balances,
        payments: state.payments
    }
}

export default compose(
    connect(mapStateToProps, {
        addTransaction,
        fetchOverview,
        editBalance
    }),
    withStyles(style),
    reduxForm({
        form: 'addTransaction'
    })
)(AddTransaction)
