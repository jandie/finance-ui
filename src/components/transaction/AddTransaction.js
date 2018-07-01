import React, {Component} from 'react';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';

import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const style = {
    field: {
        width: '90%',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '15px',
    },
    button: {
        marginRight: '15px',
        marginTop: '10px',
    },
};

class AddTransaction extends Component {
    renderField = ({input, label, meta: {touched, error}, ...custom}, type) => {
        const {classes} = this.props;
        return (
            <TextField
                label={label}
                autoComplete="none"
                type={type}
                className={classes.field}
                {...input}
                {...custom}
            />
        );
    };

    onSubmit = (balance) => {
        // this.props.addBalance(balance).then(() => {
        //     this.props.closeNewBalance();
        //     this.props.reset();
        // });
    };

    render() {
        const {handleSubmit, classes} = this.props;

        return (
            <CardContent>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        name={"description"}
                        label={"Description"}
                        type={'normal'}
                        component={this.renderField}
                    />
                    <Field
                        name={"amount"}
                        label={"Amount"}
                        type={'number'}
                        component={this.renderField}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type={'submit'}
                        className={classes.button}>
                        Add balance
                    </Button>
                    <Button variant="contained"
                            onClick={this.props.onCancel}
                            className={classes.button}>
                        Cancel
                    </Button>
                </form>
            </CardContent>
        );
    }
}

export default compose(
    withStyles(style),
    reduxForm({
        form: 'addTransaction'
    })
) (AddTransaction)
