import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';

import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
    TextField
} from 'redux-form-material-ui';

import {addPayment} from "../../actions/payments";

const styles = {
    form: {
        width: '100%'
    },
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

class AddPayment extends Component {
    onSubmit = (payment) => {
        payment.outgoing = this.props.outgoing;

        this.props.addPayment(payment, this.props.token, () => {
          this.props.toggleNewPayment();
        });
    };

    render() {
        const {classes, handleSubmit} = this.props;
        return (
            <CardContent>
                <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        label={'Name'}
                        name="name"
                        component={TextField}
                        className={classes.field}/>
                    <Field
                        label={'Amount'}
                        name="amount"
                        type={'number'}
                        component={TextField}
                        className={classes.field}/>
                    <Button
                        variant="contained"
                        color="primary"
                        type={'submit'}
                        className={classes.button}>
                        Add payment
                    </Button>
                    <Button variant="contained"
                            onClick={this.props.toggleNewPayment}
                            className={classes.button}>
                        Cancel
                    </Button>
                </form>
            </CardContent>
        );
    }
}

function mapStateToProps(state) {
    return{
        token: state.auth.token
    }
}

export default compose(
    connect(mapStateToProps, {
        addPayment
    }),
    withStyles(styles),
    reduxForm({
        form: 'AddPayment'
    })
) (AddPayment)

