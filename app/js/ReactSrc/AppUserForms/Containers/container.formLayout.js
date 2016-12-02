/**
 * Created by dennis on 1/12/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FormLayout from './../Sections/section.formLayout'
import ReactConstants from '../../Utils/Constants/ReduxConstants'
import FormConstants from '../../Utils/Constants/UserFormsConstants'

import {setFormActiveData} from '../Actions/ActionFormUsers'


const mapStateToProps = (state) => {
    return {
        formData: state.formsUsersData.userFormData
    }
};

const mapDispatchToProps = (dispatch, getState) => {
    let formData = null;
    switch(getState.location.pathname){
        case ReactConstants.Routes.USERS_ADD_TYPE_A: case ReactConstants.Routes.USERS_ADD_TYPE_A+'/':
        formData = FormConstants.forms.filter(item => item.route == ReactConstants.Routes.USERS_ADD_TYPE_A);
        break;
        case ReactConstants.Routes.USERS_ADD_TYPE_B: case ReactConstants.Routes.USERS_ADD_TYPE_B+'/':
        formData = FormConstants.forms.filter(item => item.route == ReactConstants.Routes.USERS_ADD_TYPE_B);
        break;
        default:
            break
    }
    dispatch(setFormActiveData(formData ? formData[0] : null));
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormLayout);