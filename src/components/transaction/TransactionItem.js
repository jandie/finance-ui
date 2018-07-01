import React, {Component} from 'react';
import {compose} from 'redux';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {withStyles} from '@material-ui/core/styles';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import Green from '@material-ui/core/colors/green';
import Red from '@material-ui/core/colors/red';

const styles = {
    name: {
        flex: 1,
        width: '50%',
    },
    upArrow: {
        float: 'left',
        marginRight: '20px',
        color: Red[500],
    },
    downArrow: {
        float: 'left',
        marginRight: '20px',
        color: Green[500],
    },
    text: {
        marginTop: '3px',
    }
};

class TransactionItem extends Component {
    constructor(props) {
        super(props);

        this.state = {expanded: false};
    }

    onChangeExpansion = (event, expanded) => {
        this.setState({
            expanded: expanded
        })
    };

    render() {
        const {classes} = this.props;
        return (<ExpansionPanel
            expanded={this.state.expanded}
            onChange={this.onChangeExpansion}
        >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <div className={classes.name}>
                    {this.props.transaction.outgoing ?
                        <ArrowUpIcon className={classes.upArrow}/> :
                        <ArrowDownIcon className={classes.downArrow}/>}
                    <Typography className={classes.text}>
                        {this.props.transaction.description}
                    </Typography>
                </div>

                <Typography className={classes.text}>
                    {this.props.transaction.amount}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

            </ExpansionPanelDetails>
        </ExpansionPanel>);
    }
}

export default compose(
    withStyles(styles),
)(TransactionItem);