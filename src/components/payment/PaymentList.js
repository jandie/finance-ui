import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import {withStyles} from '@material-ui/core/styles';

import requireAuth from "../auth/requireAuth";
import {fetchPayments, editPayment, deletePayment} from "../../actions/payments";
import PaymentItem from "./PaymentItem";

const styles = {};

class PaymentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            outgoing: this.props.match.params.outgoing === 'true',
            newPaymentOpen: false
        };
    }

    componentDidMount() {
        this.props.fetchPayments(this.props.token);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.outgoing === nextProps.match.params.outgoing !== 'true') {
            this.setState({
                outgoing: nextProps.match.params.outgoing === 'true'
            });
        }
    }

    renderPayments = () => {
        const {payments} = this.props;

        if (!payments.payments || _.size(payments.payments) === 0)
            return <div/>;

        return _.map(this.props.payments.payments, payment => {
            if (payment.outgoing === this.state.outgoing) {
                return (
                    <PaymentItem
                        key={payment.id}
                        token={this.props.token}
                        payment={payment}
                        editPayment={this.props.editPayment}
                        deletePayment={this.props.deletePayment}
                    />
                );
            }
        })
    };

    renderPaymentsLoading = () => {
        const {payments} = this.props;
        if (!payments || payments.fetching)
            return <LinearProgress/>;
    };

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant={'title'}>{this.state.outgoing ?
                        "Expenses" : "Incomes"}</Typography>
                    <CardActions>
                        <Button
                            size="small"
                            onClick={() => {
                                this.setState({
                                    newBalanceOpen: !this.state.newBalanceOpen
                                })
                            }}>
                            Add
                        </Button>
                    </CardActions>
                </CardContent>
                <Collapse in={this.state.newPaymentOpen}>
                    {/*<AddBalance*/}
                    {/*closeNewBalance={this.closeNewBalanceCallback}*/}
                    {/*token={this.props.token}*/}
                    {/*/>*/}
                </Collapse>
                {this.renderPayments()}
                {this.renderPaymentsLoading()}
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        payments: state.payments
    }
}

export default compose(
    connect(mapStateToProps, {
        fetchPayments,
        editPayment,
        deletePayment
    }),
    withStyles(styles),
)(requireAuth(PaymentList));