/**
 * Created by Dennis on 7/6/16.
 */
import React, {Component, PropTypes} from 'react'

export default class InputBox extends Component{
    constructor(props){
        super(props);
        this.changeInput = this.changeInput.bind(this);
        this.state = {
            validate: false
        };
        this.sendValue = null;
        this.validateData = this.validateData.bind(this);
    }
    validateData(value){
        let {isNumber, itemLength, isAValue, itemMaxLength} = this.props;
        // var transformedInput = isNumber ? (value && value != '' ? value.replace(/[^0-9,-/(/) ]/g, '') : value) : value;
        var transformedInput = null;
        if(isNumber){
            transformedInput = value && value != '' ? value.replace(/[^0-9]/g, '') : value;
        }
        else{
            transformedInput = value
        }
        if(itemLength){
            var minNumber = '1';
            for(var i=0; i< (itemLength)-1; i++){
                minNumber = minNumber+'0'
            }
            if(isNumber && isAValue){
                transformedInput = parseInt(transformedInput);
                if(parseInt(minNumber) <= parseInt(transformedInput)){
                    this.setState({validate: true});
                }
                else{
                    this.setState({validate: false});
                }
            }
            else{
                var noSpace = transformedInput.replace(/ /g,'');
                if(noSpace.length > (minNumber.length)-1){
                    this.setState({validate: true});
                }
                else{
                    this.setState({validate: false});
                }
            }
        }
        else{
            var noSpace = transformedInput.replace(/ /g,'');
            noSpace.length > 0 ? this.setState({validate: true}) : this.setState({validate: false});
        }
        this.sendValue = transformedInput ? transformedInput.toString() : '';
        if(itemMaxLength){
            if(this.sendValue.length > itemMaxLength){
                this.sendValue = this.sendValue.substring(0, itemMaxLength);
            }
        }
        return this.sendValue;
    }
    changeInput(event){
        let {changeBox, inputId} = this.props;
        let value = event.target.value;
        let sendValues = this.validateData(value);
        setTimeout(()=>{
            changeBox(sendValues, inputId, this.state.validate);
        }, 10);
    }
    componentWillReceiveProps(nextProps){
        let defaultValue = nextProps.inputValue.value ? nextProps.inputValue.value : nextProps.inputValue;
        if(defaultValue && (this.sendValue != defaultValue)){
            this.validateData(defaultValue.toString());
        }
    }
    render() {
        let {placeholder, label, password, required, inputValue} = this.props;
        return	<div className="latam-input-box m-t-lg m-b-lg">
            <input onChange={this.changeInput} placeholder={placeholder} id={'input_'+label} type={password ? 'password' : 'text'} value={inputValue && typeof inputValue == 'object' ? inputValue.value : (inputValue ? inputValue : '')} className="validate"/>
            <label className={required ? 'required' : null} htmlFor={'input_'+label}>
                {required ?
                    <span className="icon-status">
                        <i className={this.state.validate ? 'material-icons latam-success-text' : 'material-icons latam-success-text hidden'}>check</i>
                        <i className={!this.state.validate ? 'material-icons latam-danger-text' : 'material-icons latam-warning-text hidden'}>clear</i>
                    </span>
                : null}
                {label}
            </label>
        </div>
    }
}

InputBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
    inputId: PropTypes.string.isRequired,
    changeBox: PropTypes.func.isRequired,
    password:  PropTypes.bool,
    required:  PropTypes.bool,
    isNumber:  PropTypes.bool,
    itemLength:  PropTypes.number,
    isAValue:  PropTypes.bool,
    itemMaxLength:  PropTypes.number
};