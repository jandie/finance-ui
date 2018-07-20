import React, {Component} from 'react';
import {compose} from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const style = {
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

class EditTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            amount: 0
        }
    }

    componentDidMount() {
        this.setState({
            description: this.props.transaction.description,
            amount: this.props.transaction.amount
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const transaction = {
            id: this.props.transaction.id,
            description: this.state.description,
            amount: this.state.amount
        };

        this.props.editTransaction(transaction, this.props.token, () => {
            this.props.changeExpansion(null, false);
            this.props.fetchOverview(this.props.token);
        });
    };

    render() {
        const {classes, transaction} = this.props;
        return (
            <form className={classes.form} onSubmit={this.onSubmit}>
                <TextField
                    label={'Description'}
                    autoComplete="none"
                    className={classes.field}
                    value={this.state.description}
                    onChange={(event) => {
                        this.setState({
                            description: event.target.value
                        });
                    }}
                />
                <TextField
                    label={'Amount'}
                    autoComplete="none"
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
                            this.props.deleteTransaction(transaction.id, this.props.token,
                                () => {
                                    this.props.fetchOverview(this.props.token);
                                });
                        }}>
                        Remove
                    </Button>
                    <Button size="small" type={'submit'}>Edit</Button>
                </div>
            </form>
        );
    }
}

export default compose(
    withStyles(style)
)(EditTransaction)