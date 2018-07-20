import React, {Component} from 'react';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import * as actions from '../../actions/auth';

class Login extends Component {
    renderUsernameField({input, label, meta: {touched, error}, ...custom}) {
        return (
            <TextField
                id="username"
                label={label}
                autoComplete="none"
                className={'field'}
                {...input}
                {...custom}
            />
        );
    }

    renderPasswordField({input, label, meta: {touched, error}, ...custom}) {
        return (
            <TextField
                id="password-input"
                label={label}
                type="password"
                autoComplete="none"
                className={'field'}
                {...input}
                {...custom}
            />
        );
    }

    onLogin = (credentials) => {
        this.props.login(credentials, () => {
            this.props.history.push('/dashboard/overview');
        })
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <Grid item xs={10} className={'login-card'}>
                <Card>
                    <CardHeader
                        title={"Login"}
                    />
                    <form onSubmit={handleSubmit(this.onLogin)}>
                        <Field
                            label={'Username'}
                            name={"username"}
                            component={this.renderUsernameField}
                        />
                        <Field
                            label={'Password'}
                            name={"password"}
                            component={this.renderPasswordField}
                        />
                        <Button
                            type={'submit'}
                            variant="contained"
                            color="primary"
                            className={'field'}>
                            Login
                        </Button>
                    </form>
                </Card>
            </Grid>
        );
    }
}

export default compose(
    connect(null, actions),
    reduxForm({form: 'login'})
)(Login)