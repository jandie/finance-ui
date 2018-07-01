import React, {Component} from 'react';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../actions/balance';


class AddBalance extends Component {
    renderField({input, label, meta: {touched, error}, ...custom}, type) {
        return (
            <TextField
                label={label}
                autoComplete="none"
                type={type}
                className={'field'}
                {...input}
                {...custom}
            />
        );
    }

    onSubmit = (balance) => {
        this.props.addBalance(balance).then(() => {
            this.props.closeNewBalance();
            this.props.reset();
        });
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            name={"name"}
                            label={"Name"}
                            type={'normal'}
                            component={this.renderField}
                        />
                        <Field
                            name={"amount"}
                            label={"Amount"}
                            type={'number'}
                            component={this.renderField}
                        />
                        <Button variant="contained" color="primary" type={'submit'}
                                className={'add-object-button'}>
                            Add balance
                        </Button>
                        <Button variant="contained" className={'add-object-button'}
                                onClick={this.props.closeNewBalance}>
                            Cancel
                        </Button>
                    </form>
                </CardContent>
            </Card>
        );
    }
}

export default compose(
    connect(null, actions),
    reduxForm({
        form: 'addBalance'
    })
)(AddBalance)