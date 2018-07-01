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
    deleteTransaction} from "../../actions/transactions";
import {fetchOverview} from "../../actions/overview";
import TransactionItem from './TransactionItem';
import AddTransaction from './AddTransaction';

const styles = {};

class TransactionList extends Component {
    state = {
        addOpen: false
    };

    componentDidMount() {
        this.props.fetchTransactions();
    }

    drawTransactions = () => {
        const {transactions, fetching} = this.props.transactions;

        if (_.size(transactions) === 0 && fetching)
            return <LinearProgress/>;

        return _.map(transactions, transaction => {
            return <TransactionItem
                key={transaction.id}
                transaction={transaction}
                editTransaction={this.props.editTransaction}
                deleteTransaction={this.props.deleteTransaction}
                fetchOverview={this.props.fetchOverview}
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
                    <AddTransaction
                        onCancel={() => this.setState({addOpen: false})}
                    />
                </Collapse>
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
    connect(mapStateToProps, {
        fetchTransactions,
        editTransaction,
        deleteTransaction,
        fetchOverview
    }),
    withStyles(styles),
)(TransactionList)