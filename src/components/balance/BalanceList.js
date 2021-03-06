import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';

import * as balanceActions from '../../actions/balance';
import AddBalance from './AddBalance';
import BalanceItem from './BalanceItem';
import requireAuth from "../auth/requireAuth";


class BalanceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBalanceOpen: false
        };
    }

    componentDidMount() {
        this.props.fetchBalances(this.props.token);
    }

    closeNewBalanceCallback = () => {
        this.setState({
            newBalanceOpen: false
        })
    };

    renderBalances = () => {
        if (_.size(this.props.balances.balances) === 0 &&
            this.props.balances.loading)
            return (
                <Card>
                    <CardContent>
                        <LinearProgress />
                    </CardContent>
                </Card>
            );

        if (_.size(this.props.balances.balances) === 0)
            return (
                <Card>
                    <CardContent>
                        <Typography>No balances found</Typography>
                    </CardContent>
                </Card>
            );

        return _.map(this.props.balances.balances, balance => {
            return (
                <BalanceItem
                    key={balance.id}
                    balance={balance}
                    deleteBalance={this.props.deleteBalance}
                    token={this.props.token}
                />
            )
        });
    };

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant={'title'}>Balances</Typography>
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
                    <Collapse in={this.state.newBalanceOpen}>
                            <AddBalance
                                closeNewBalance={this.closeNewBalanceCallback}
                                token={this.props.token}
                            />
                    </Collapse>

                    {this.renderBalances()}
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        balances: state.balances,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, balanceActions)(requireAuth(BalanceList))