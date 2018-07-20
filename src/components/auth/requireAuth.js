import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            if (!this.props.auth.token) {
                this.props.history.push('/login');
            }
        }

        render() {
            return <ChildComponent {...this.props}/>;
        }
    }

    function mapStateToProps({ auth }) {
        return {auth};
    }

    return connect(mapStateToProps) (ComposedComponent);
};