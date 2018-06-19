import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom';

import * as actions from '../../actions'


class Balances extends Component {
    componentDidMount() {
        this.props.fetchBalances();
    }

    renderNoContent() {
        return (
            <Card>
                <CardContent>
                    <Typography>No balances found</Typography>
                </CardContent>
            </Card>
        );
    }

    renderBalances = () => {
        return _.map(this.props.balances, balance => {
            return (
                <ExpansionPanel key={balance.id}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={'balance-name'}>{balance.name}</Typography>
                        <Typography>{balance.amount}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelActions>
                        <Button
                            size="small"
                            color={"secondary"}
                            onClick={() => {
                                this.props.deleteBalance(balance.id);
                            }}>
                            Remove
                        </Button>
                        <Button size="small">Edit</Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
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
                                    this.props.history.push("/dashboard/balances/add");
                                }}>
                                Add
                            </Button>
                        </CardActions>
                    </CardContent>
                    {_.size(this.props.balances) === 0 ?
                        this.renderNoContent() :
                        this.renderBalances()}
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        balances: state.balances
    }
}

export default connect(mapStateToProps, actions)(Balances)