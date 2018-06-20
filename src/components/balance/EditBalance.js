import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../actions/index';

class EditBalance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            amount: ''
        }
    }

    componentDidMount() {
        this.setState({
           name: this.props.balance.name,
           amount: this.props.balance.amount
        });
    }

    renderField({input, label, meta: {touched, error}, ...custom}) {
        return (
            <TextField
                label={label}
                autoComplete="none"
                className={'field'}
                {...input}
                {...custom}
            />
        );
    }

    onSubmit = (event) => {
        event.preventDefault();
        const balance = {
            name: this.state.name,
            amount: this.state.amount
        };

        this.props.editBalance(this.props.balance.id, balance)
            .then(() => this.props.changeExpansion(null, false));
    };

    render() {
        return (
            <form className={'edit-form'} onSubmit={this.onSubmit}>
                <TextField
                    label={'Name'}
                    autoComplete="none"
                    className={'field'}
                    value={this.state.name}
                    onChange={(event) => {
                        this.setState({
                           name: event.target.value
                        });
                    }}
                />
                <TextField
                    label={'Name'}
                    autoComplete="none"
                    className={'field'}
                    value={this.state.amount}
                    onChange={(event) => {
                        this.setState({
                            amount: event.target.value
                        });
                    }}
                />
                <div className={'edit-form-actions'}>
                    <Button
                        size="small"
                        color={"secondary"}
                        onClick={() => {
                            this.props.deleteBalance(this.props.balance.id);
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
    connect(null, actions)
) (EditBalance)