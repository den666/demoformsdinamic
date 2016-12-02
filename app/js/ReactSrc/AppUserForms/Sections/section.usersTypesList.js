/**
 * Created by dennis on 1/12/16.
 */


import React, {Component, PropTypes} from 'react';

export  default class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {formList, gotoPage} = this.props;
        return (
            <div className="links-to-forms">
                { formList.map((item)=>{
                    return <div onClick={()=>gotoPage(item.route)} key={item.role.id}>añadir {item.role.description}</div>
                    })
                }
            </div>
        )
    }
}

Layout.propTypes = {
    formList: PropTypes.array.isRequired,
    gotoPage: PropTypes.func.isRequired
};
