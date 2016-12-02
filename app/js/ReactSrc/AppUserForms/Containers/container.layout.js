/**
 * Created by dennis on 1/12/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Layout from './../Sections/section.layout'
import ReduxConstants from '../../Utils/Constants/ReduxConstants'

import {setFormActiveData} from '../Actions/ActionFormUsers'

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToHome: () => {
            browserHistory.push(ReduxConstants.Routes.USERS_HOME);
            dispatch(setFormActiveData(null));
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);