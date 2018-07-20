import React, {Component} from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    name: {
        flex: 1,
        width: '50%',
    },
    text: {
        marginTop: '3px',
        marginRight: '10px'
    },
    textDescription: {
        color: '#aeb0b2',
        marginTop: '3px',
        marginRight: '5px'
    },
    form: {
        width: '100%',
    },
    field: {
        width: '90%',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '15px',
    },
    actions: {
        float: 'right',
    },
};

class PaymentItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.payment.name,
            amount: this.props.payment.amount,
            expanded: false
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        const payment = {
            id: this.props.payment.id,
            name: this.state.name,
            amount: this.state.amount,
            outgoing: this.props.payment.outgoing,
            paid: this.props.payment.paid
        };

        this.props.editPayment(payment, this.props.token, () => {
            this.toggleExpansion();
        });
    };

    toggleExpansion = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    };

    render() {
        const {payment, classes} = this.props;
        return (
            <ExpansionPanel
                onChange={this.toggleExpansion}
                expanded={this.state.expanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <div className={classes.name}>
                        <Typography className={classes.text}>
                            {payment.name}
                        </Typography>
                    </div>
                    <Typography className={classes.textDescription}>
                        amount:
                    </Typography>
                    <Typography className={classes.text}>
                        {payment.amount}
                    </Typography>
                    <Typography className={classes.textDescription}>
                        paid:
                    </Typography>
                    <Typography className={classes.text}>
                        {payment.paid}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <TextField
                            label={'Name'}
                            autoComplete="none"
                            className={classes.field}
                            value={this.state.name}
                            onChange={(event) => {
                                this.setState({
                                    name: event.target.value
                                });
                            }}
                        />
                        <TextField
                            label={'Amount'}
                            autoComplete="none"
                            type={'number'}
                            className={classes.field}
                            value={this.state.amount}
                            onChange={(event) => {
                                this.setState({
                                    amount: event.target.value
                                });
                            }}
                        />
                        <div className={classes.actions}>
                            <Button
                                size="small"
                                color={"secondary"}
                                onClick={() => {
                                    this.props.deletePayment(payment.id, this.props.token);
                                }}>
                                Remove
                            </Button>
                            <Button size="small" type={'submit'}>Edit</Button>
                        </div>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default withStyles(styles)(PaymentItem);

