/**
 * Created by dennis on 1/12/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import UsersTypesList from './../Sections/section.usersTypesList'

const mapStateToProps = (state) => {
    console.log(state);
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersTypesList);