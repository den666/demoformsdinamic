/**
 * Created by dennis on 1/12/16.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Layout from './../Sections/section.layout'


const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToHome: (page) => {
            console.log(page);
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);