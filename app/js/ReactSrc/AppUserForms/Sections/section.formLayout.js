/**
 * Created by dennis on 1/12/16.
 */


import React, {Component, PropTypes} from 'react';

import SelectDropDown from './../../Components/SelectDropDown/component.selectDropDown.js'
import InputBox from './../../Components/InputBox/component.inputBox.js'

export default class FormLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {formData} = this.props;
        console.log(formData);
        return (
            <div className="layout">
                {formData ?
                    formData.userFormFields.map((item, key)=>{ console.log(item)
                        const field = item;
                        var isInputBox = field.inputClass == 'InputBox';
                        var isSelectDropDown = field.inputClass == 'SelectDropDown';
                        var selectedItem;

                        if(isSelectDropDown){
                            {/*selectedItem = field.catalogProvider().find((item)=> this.props.default === item.id) || {};*/}
                        }
                        const component = isInputBox?<InputBox default={this.props.default} changeBox={this.props.changeBox} notShowInitialError={!this.props.showInitialError}  required={field.required}  number={field.number} noQuantity={field.noQuantity} type={field.id} itemMaxLength={field.itemMaxLength} itemEmail={field.email} cedula={field.cedula} itemLength={field.itemLength} minimumValue={field.minimumValue} maximumValue={field.maximumValue} label={field.label} disabled={field.disabled} placeholder={field.placeholder} enableErrorMessage={true} errorMessageMinimumValue={field.errorMessageMinimumValue} errorMessageMaximumValue={field.errorMessageMaximumValue}/>
                            : isSelectDropDown?<SelectDropDown required={field.required} default={selectedItem} type={field.labels.singular_label} label={field.label} placeholder={field.placeholder} data={field.catalogProvider} changeInput={this.changeInput} notShowInitialError={!this.props.showInitialError} enableErrorMessage={true} tooltip={field.tooltip} disabled={field.disabled}/>
                            :<DatePicker required={field.required} default={selectedItem} type={field.id} label={field.label} placeholder={field.placeholder} minDate={field.minDate} maxDate={field.maxDate} changeBox={this.props.changeBox} notShowInitialError={!this.props.showInitialError} enableErrorMessage={true}/>;


                        return <div key={key}>{component}</div>
                    })
                : null }
            </div>
        )
    }
}

FormLayout.propTypes = {
    formData: PropTypes.object
};