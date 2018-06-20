import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';

export default function (props) {
    return(
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={'balance-name'}>{props.balance.name}</Typography>
                <Typography>{props.balance.amount}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelActions>
                <Button
                    size="small"
                    color={"secondary"}
                    onClick={() => {
                        props.deleteBalance(props.balance.id);
                    }}>
                    Remove
                </Button>
                <Button size="small">Edit</Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}