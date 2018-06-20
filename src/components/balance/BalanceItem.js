import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import EditBalance from './EditBalance';

export default function (props) {
    return(
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={'balance-name'}>{props.balance.name}</Typography>
                <Typography>{props.balance.amount}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <EditBalance
                    balance={props.balance}
                    deleteBalance={props.deleteBalance}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}