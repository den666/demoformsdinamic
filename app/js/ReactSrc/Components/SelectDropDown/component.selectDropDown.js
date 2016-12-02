/**
 * Created by dennis on 2/12/16.
 */

import React from 'react';
import FormatUtils from '../../Utils/Format/FormatUtils'
import {REQUIRED} from '../../Utils/Constants/InputErrorMessages'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

document.onclick = function(){
    var dw = document.getElementsByClassName('latam-dropdown-content');
    for(var i=0; i<dw.length; i++){
        dw[i].classList.remove('active');
    }
};

export default class SelectDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterItems:[],
            showError: !this.props.notShowInitialError,
            searchText: null
        };
        this.selectData = this.selectData.bind(this);
        this.toggleDw = this.toggleDw.bind(this);
        this.inputFocusAction = this.inputFocusAction.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.down = this.down.bind(this);
        this.onNavList = this.onNavList.bind(this);
        this.onFocusButton = this.onFocusButton.bind(this);
    }

    selectData(result, type, changeType, changetypeValue){
        this.refs.itemDw.classList.remove('active');
        this.props.changeInput(result, type, changeType, changetypeValue);
        this.setState({showError: true});
    };

    toggleDw(e){
        e.stopPropagation();
        e.preventDefault();
        var dw = document.getElementsByClassName('latam-dropdown-content');
        for(var i=0; i<dw.length; i++){
            dw[i].classList.remove('active');
        }
        if(!this.props.disabled) {
            this.refs.itemDw.classList.toggle('active');
            if (this.refs.itemDw.classList.contains('active')) {
                this.refs.itemInput.value = '';
                this.refs.itemInput.focus();
            }
        }
    };

    inputFocusAction(e){
        e.stopPropagation();
    };

    inputChange(event) {
        var value = FormatUtils.fixText(event.target.value);
        var newList = [...this.props.data.filter((itemRemove, i) => ((FormatUtils.fixText(itemRemove.name ? itemRemove.name : (itemRemove.value ? itemRemove.value : itemRemove.description))).includes(value)))];
        this.setState({
            filterItems: newList, searchText: value
        });
    };

    onFocusButton(event){
        if (event.keyCode == 40)
        {
            this.toggleDw(event);
        }
    }

    down(event){
        if (event.keyCode == 40)
        {
            event.preventDefault();
            this.refs.resultList.getElementsByTagName('li')[0].getElementsByTagName('a')[0].focus();
        }
    }

    onNavList(event){
        var listLength 	= this.refs.resultList.getElementsByTagName('li').length;
        var current		= document.activeElement.dataset.order;
        //bajar
        if (event.keyCode == 40)
        {
            event.preventDefault();
            if(current < (listLength-1)){
                this.refs.resultList.getElementsByTagName('li')[parseInt(current)+1].getElementsByTagName('a')[0].focus();
            }
            else{
                this.refs.itemInput.focus();
            }
        }
        //subir
        else if (event.keyCode == 38)
        {
            event.preventDefault();
            if(current > 0){
                this.refs.resultList.getElementsByTagName('li')[parseInt(current)-1].getElementsByTagName('a')[0].focus();
            }
            else{
                this.refs.itemInput.focus();
            }
        }
        else {
            if (event.keyCode != 13)
            {
                this.refs.itemInput.focus();
            }
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            filterItems: nextProps.data
        });
        if(!nextProps.notShowInitialError){
            this.setState({showError:true})
        }
    }


    render() {
        const validValue = this.props.default && (this.props.default.name || this.props.default.description || this.props.default.value);
        var classInput = 'latam-dropdown m-b-lg';
        if(this.props.required && !validValue){
            classInput += ' invalid';
            if(this.state.showError){
                classInput += ' showError'

            }
        }
        var classDropDown = this.props.data && this.props.data.length < 1 ? 'disable latam-dropdown-button btn z-depth-0 truncate' : 'latam-dropdown-button btn z-depth-0 truncate';
        if(!this.props.default || (!this.props.default.description && !this.props.default.value && !this.props.default.name)){
            classDropDown += ' placeholder'
        }
        return	<div className={classInput}>
            <label className={this.props.required && this.state.showError? 'required' : null}>
                {this.props.required && this.state.showError?
                    <span className="icon-status">
                                <ReactCSSTransitionGroup transitionName="introTop" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
                                    {validValue ? <i className="transition-intro-top material-icons latam-success-text">check</i> : null}
                                </ReactCSSTransitionGroup>
                                <ReactCSSTransitionGroup transitionName="introTop" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
                                    {!validValue ? <i className="transition-intro-top material-icons latam-danger-text">clear</i> : null}
                                </ReactCSSTransitionGroup>
                            </span>
                    : null}
                {this.props.label} {this.props.tooltip? <a className="tooltipped" data-position="bottom" data-delay="50" data-tooltip={this.props.tooltip}><i className="material-icons">info_outline</i></a>:null}
            </label>
            <a href="#" onKeyDown={this.onFocusButton} onClick={this.toggleDw} className={classDropDown} data-activates={'dropdown_'+(this.props.type.name ? this.props.type.name : this.props.type)}><i className="material-icons right">keyboard_arrow_down</i>{this.props.default && this.props.default.name ? this.props.default.name : (this.props.default && this.props.default.description ? this.props.default.description : (this.props.default && this.props.default.value ? this.props.default.value : this.props.placeholder))}</a>
            <div id={'dropdown_'+(this.props.type.name ? this.props.type.name : this.props.type)} className={`${this.props.bottom ? 'bottom-dropdown' : ''} latam-dropdown-content`} ref="itemDw">
                <div className="over-item-bg">
                    <div className="over-item">
                        <div className="search-title hide-on-large-and-up">
                            {this.props.default && this.props.default.name ? this.props.default.name : (this.props.default && this.props.default.description ? this.props.default.description : (this.props.default && this.props.default.value ? this.props.default.value : this.props.placeholder))}
                        </div>
                        <div className="search-input">
                            <input onFocus={this.inputChange} onChange={this.inputChange} onClick={this.inputFocusAction} onKeyDown={this.down} type="text" ref="itemInput" placeholder="filtrar resultados"/>
                        </div>
                        <ul ref="resultList" onKeyDown={this.onNavList}>
                            {
                                this.state.filterItems.length > 0? this.state.filterItems.map((result, i) => {
                                    return <li key={i} data-content={FormatUtils.fixText(result.name ? result.name : (result.description ? result.description : result.value))}><a data-order={i} href onClick={(e)=>{e.preventDefault(); this.selectData(result, this.props.type, (this.props.changeType ? this.props.changeType : null), (this.props.changeTypeValue ? this.props.changeTypeValue : null))}}>{result.name ? result.name : (result.description ? result.description : result.value)}</a></li>
                                }): this.state.searchText?<div className="center p-t p-b">No se encotraron resultados de búsqueda con "{this.state.searchText}".</div>:<div className="center p-t p-b">No se encotraron elementos.</div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {this.props.data.length < 1 ?
                <div className="disable-box"></div>
                : null }
            {this.props.required && this.props.enableErrorMessage && this.state.showError && !validValue ? <p className="error-message dropdown">{this.props.errorMessageRequired || REQUIRED}</p> : null}
        </div>
    }
}