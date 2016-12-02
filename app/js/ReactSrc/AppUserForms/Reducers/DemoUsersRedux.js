/**
 * Created by mordred on 10/31/16.
 */


import ReduxConstants from '../../Utils/Constants/ReduxConstants'
import UsersFormsList from '../../Utils/Constants/UserFormsConstants'

const initialState = {
    role: 0,
    formsList: UsersFormsList.forms,
    userFormData: null,
    userPostFormData: {},
    userFormStatus: ReduxConstants.LoadingStatus.LOADING_INACTIVE
};

export default function Login(state = initialState, action) {
    switch (action.type) {
        case ReduxConstants.FormUserActions.SET_FORM_ACTIVE_DATA:
            return {...state, userFormData: action.userFormData};
        // case Constants.LoginActions.LOGIN_STATUS:
        //     return {...state, loginStatus : action.status};
        // case Constants.LoginActions.JSON_RESPONSE:
        //     return {...state, message : action.message};
        // case Constants.LoginActions.INIT_VARS:
        //     return {...state, loginEndPoint : action.loginEndPoint, loginServer: action.loginServer};
        default:
            return state;
    }
}