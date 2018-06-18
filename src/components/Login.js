import React, {Component} from 'react';
import {compose} from 'redux';
import {reduxForm, Field} from 'redux-form';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './Login.css'

class Login extends Component {
    renderUsernameField() {
        return (
            <TextField
                id="username"
                label="Username"
                autoComplete="none"
                className={'field'}
            />
        );
    }

    renderPasswordField() {
        return (
            <TextField
                id="password-input"
                label="Password"
                type="password"
                autoComplete="none"
                className={'field'}
            />
        );
    }

    render() {
        return (
            <Grid item xs={10} className={'login-card'}>
                <Card>
                    <CardHeader
                        title={"Login"}
                    />
                    <form>
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
    reduxForm({form: 'login'})
)(Login)