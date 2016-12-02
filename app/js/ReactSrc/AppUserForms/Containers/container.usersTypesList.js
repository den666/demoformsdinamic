/**
 * Created by dennis on 1/12/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import UsersTypesList from './../Sections/section.usersTypesList'

const mapStateToProps = (state) => {
    return {
        formList: state.formsUsersData.formsList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gotoPage: (url) =>{
            browserHistory.push(url);
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersTypesList);