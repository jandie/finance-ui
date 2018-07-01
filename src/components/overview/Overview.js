import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {fetchOverview} from "../../actions/overview";

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
    },
});

class Overview extends Component {
    componentDidMount() {
        this.props.fetchOverview();
    }

    render() {
        const {classes} = this.props;
        const {overview} = this.props.overview;

        if (!overview) return <div/>;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant={'title'}>Overview</Typography>
                </CardContent>
                <CardContent>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell numeric>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Current total</TableCell>
                                <TableCell numeric>{overview.balance}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>End balance</TableCell>
                                <TableCell numeric>{overview.endBalance}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>To pay</TableCell>
                                <TableCell numeric>{overview.toPay}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>To get</TableCell>
                                <TableCell numeric>{overview.toGet}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        overview: state.overview
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    connect(mapStateToProps, {fetchOverview}),
    withStyles(styles)
)(Overview)