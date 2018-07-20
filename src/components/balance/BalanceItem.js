import React, {Component} from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import EditBalance from './EditBalance';

export default class BalanceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {expanded: false};
    }

    onChangeExpansion = (event, expanded) => {
        this.setState({
            expanded: expanded
        })
    };

    render () {
        return(
            <ExpansionPanel
                expanded={this.state.expanded}
                onChange={this.onChangeExpansion}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={'balance-name'}>{this.props.balance.name}</Typography>
                    <Typography>{this.props.balance.amount}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EditBalance
                        balance={this.props.balance}
                        deleteBalance={this.props.deleteBalance}
                        changeExpansion={this.onChangeExpansion}
                        token={this.props.token}
                    />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}