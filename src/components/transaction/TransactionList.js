import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import {withStyles} from '@material-ui/core/styles';

import {
    fetchTransactions,
    editTransaction,
    deleteTransaction,
    addTransaction} from "../../actions/transactions";
import {fetchBalances} from "../../actions/balance";
import {fetchPayments} from "../../actions/payments";
import {fetchOverview} from "../../actions/overview";
import TransactionItem from './TransactionItem';
import AddTransaction from './AddTransaction';

const styles = {};

class TransactionList extends Component {
    state = {
        addOpen: false
    };

    componentDidMount() {
        this.props.fetchTransactions(this.props.token);
    }

    drawTransactions = () => {
        const {transactions, fetching} = this.props.transactions;

        if (_.size(transactions) === 0 && fetching)
            return <LinearProgress/>;

        const transCol = _.map(transactions, transaction => transaction);
        transCol.reverse();

        return transCol.map(transaction => {
            return <TransactionItem
                key={transaction.id}
                transaction={transaction}
                editTransaction={this.props.editTransaction}
                deleteTransaction={this.props.deleteTransaction}
                fetchOverview={this.props.fetchOverview}
                token={this.props.token}
            />;
        })
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={'title'}>Transactions</Typography>
                    <Button
                        size="small"
                        onClick={() => {
                            this.setState({
                                addOpen: !this.state.addOpen
                            })
                        }}>
                        Add
                    </Button>
                </CardContent>
                <Collapse in={this.state.addOpen}>
                    {this.state.addOpen ? <AddTransaction
                        onCancel={() => this.setState({addOpen: false})}
                        balances={this.props.balances}
                        payments={this.props.payments}
                        addTransaction={this.props.addTransaction}
                        fetchBalances={this.props.fetchBalances}
                        fetchPayments={this.props.fetchPayments}
                        token={this.props.token}
                    /> : <div/>}

                </Collapse>
                {this.drawTransactions()}
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        transactions: state.transactions,
        balances: state.balances,
        payments: state.payments,
        token: state.auth.token,
    };
}

export default compose(
    connect(mapStateToProps, {
        fetchTransactions,
        editTransaction,
        deleteTransaction,
        fetchOverview,
        addTransaction,
        fetchBalances,
        fetchPayments
    }),
    withStyles(styles),
)(TransactionList)