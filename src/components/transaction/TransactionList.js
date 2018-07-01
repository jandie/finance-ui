import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles';

import {fetchTransactions} from "../../actions/transactions";
import TransactionItem from './TransactionItem';

const styles = {};

class TransactionList extends Component {
    componentDidMount() {
        this.props.fetchTransactions();
    }

    drawTransactions = () => {
        const {transactions, fetching} = this.props.transactions;

        if (_.size(transactions) === 0 && fetching)
            return <LinearProgress/>;

        return _.map(transactions, transaction => {
            return <TransactionItem key={transaction.id} transaction={transaction}/>;
        })
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={'title'}>Transactions</Typography>
                </CardContent>
                {this.drawTransactions()}
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        transactions: state.transactions
    };
}

export default compose(
    connect(mapStateToProps, {fetchTransactions}),
    withStyles(styles),
)(TransactionList)