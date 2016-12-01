/**
 * Created by dennis on 1/12/16.
 */


import React, {Component, PropTypes} from 'react';

export default class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {children, goToHome} = this.props;
        return (
            <div className="layout">
                <a onClick={()=>{goToHome('1111212')}}>cl</a>
                {children}
            </div>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node,
    goToHome: PropTypes.func.isRequired
};
