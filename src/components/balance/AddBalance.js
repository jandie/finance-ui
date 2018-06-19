import React, {Component} from 'react';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../actions/index';


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
            this.props.history.push('/dashboard/balances')
        })
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <Card className={'login-card'}>
                <CardHeader title={"New balance"} />
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
                        <Button variant="contained" color="primary" className={'field'} type={'submit'}>
                            Add balance
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