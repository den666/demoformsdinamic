/**
 * Created by Dennis on 7/6/16.
 */
import React from 'react'
import {isValidIdentification, isEmpty, isGreaterThanDigit, hasMinimumChars, isValidEmail } from '../../Utils/Format/validationUtils'
import {REQUIRED, EMAIL, CEDULA} from '../../Utils/Constants/InputErrorMessages'

export default class InputBox extends React.Component{
    constructor(props){
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.state = {
            error: props.default?null:REQUIRED,
            showError: !this.props.notShowInitialError
        };
        this.sendValue = null;
        this.validateData = this.validateData.bind(this);
        this.getError = this.getError.bind(this);
        this.cleanValue = this.cleanValue.bind(this);
    }

    getError(value){
        if(isEmpty(value)){
            return this.props.errorMessageRequired || REQUIRED;
        }
        if(this.props.itemLength){
            const errorMinCharacters = this.props.errorMessageItenLength || `Debe ingresar al menos ${this.props.itemLength} caracteres`;
            if(this.props.number && this.props.itemValue && !this.props.noQuantity){
                if(!isGreaterThanDigit(value, this.props.itemValue))
                    return errorMinCharacters;
            }else if(!hasMinimumChars(value, this.props.itemLength)){
                return errorMinCharacters;
            }
        }

        if(this.props.itemEmail && !isValidEmail(value)){
            return this.props.errorMessageEmail || EMAIL;
        }
        if(this.props.cedula && !isValidIdentification(value)){
            return this.props.errorMessageCedula || CEDULA
        }
        if(this.props.minimumValue && (parseInt(value) < parseInt(this.props.minimumValue))){
            return this.props.errorMessageMinimumValue || `Debe ingresar un valor mayor o igual a ${this.props.minimumValue}`
        }
        if(this.props.maximumValue && (parseInt(value) > parseInt(this.props.maximumValue))){
            return this.props.errorMessageMaximumValue || `Debe ingresar un valor menor o igual a ${this.props.maximumValue}`
        }
        return null;
    }

    cleanValue(value){
        var valueProcessed = (this.props.number && value && value && !this.props.noQuantity != '') ? value.replace(/[^0-9]/g, '') : value;
        if(this.props.itemMaxLength){
            if(valueProcessed.length > this.props.itemMaxLength){
                valueProcessed = valueProcessed.substring(0, this.props.itemMaxLength);
            }
        }
        if(this.props.number && value){
            if(!this.props.noQuantity){
                valueProcessed = parseInt(valueProcessed);
            }
        }
        return valueProcessed
    }



    validateData(value){
        this.sendValue = this.cleanValue(value);
        this.setState({error : this.getError(this.sendValue)});
        return this.sendValue ? this.sendValue.toString() : '';
    }


    changeInput(event){
        this.props.changeBox(this.validateData(event.target.value), this.props.type, this.state.validate);
        this.setState({showError: true});

    }
    componentDidMount(){
        // setTimeout(()=>{
        //     if(this.props.default){
        //         this.setState({
        //             validate: true
        //         });
        //     }
        // }, 800);
    }

    componentWillReceiveProps(nextProps){
        let defaultValue = nextProps.default && nextProps.default.value ? nextProps.default.value : nextProps.default;
        if(defaultValue && (this.sendValue != defaultValue)){
            this.validateData(defaultValue.toString());
        }
        if(!nextProps.notShowInitialError){
            this.setState({showError:true})
        }
    }

    render() {
        var classInput = 'latam-dropdown m-b-lg';
        if(this.props.required && this.state.error){
            classInput += ' invalid';
            if(this.state.showError){
                classInput += ' showError'
            }
        }
        return	<div className={classInput}>
            <input disabled={this.props.disabled} onChange={this.changeInput} placeholder={this.props.placeholder} id={'input_'+this.props.label} type="text" value={this.props.default && typeof this.props.default == 'object' ? this.props.default.value : (this.props.default ? this.props.default : '')} className="validate"/>
            <label className={this.props.required ? 'required' : null} htmlFor={'input_'+this.props.label}>
                {this.props.required && this.state.showError?
                    <span className="icon-status">
                                        <i className={!this.state.error ? 'material-icons latam-success-text' : 'material-icons latam-success-text hidden'}>check</i>
                                        <i className={this.state.error ? 'material-icons latam-danger-text' : 'material-icons latam-warning-text hidden'}>clear</i>
                    </span>
                    : null}
                {this.props.label} {this.props.tooltip? <a className="tooltipped" data-position="bottom" data-delay="50" data-tooltip={this.props.tooltip}><i className="material-icons">info_outline</i></a>:null}
            </label>
            {this.props.required && this.props.enableErrorMessage && this.state.showError && this.state.error ? <p className="error-message">{this.state.error}</p> : null}
        </div>
    }
}