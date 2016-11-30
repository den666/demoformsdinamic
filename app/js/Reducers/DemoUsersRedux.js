/**
 * Created by mordred on 10/31/16.
 */


import ReduxConstants from '../Utils/Constants/ReduxConstants'

const initialState = {
    role: 0,
    userFormFields: null,
    userFormData: {},
    userFormEndPoint: '',
    userFormStatus: ReduxConstants.LoadingStatus.LOADING_INACTIVE
};

export default function Login(state = initialState, action) {
    switch (action.type) {
        // case Constants.LoginActions.GET_RESPONSE:
        //     return {...state, accessToken : action.accessToken, role: action.role};
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