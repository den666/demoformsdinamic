/**
 * Created by Dennis on 14/10/16.
 */
import ReducerConstants from '../../Utils/Constants/ReduxConstants';
import 'whatwg-fetch';



export function setFormActiveData(userFormData) {
    return {
        type: ReducerConstants.FormUserActions.SET_FORM_ACTIVE_DATA,
        userFormData
    }
}


export function setMessage(message) {
    return {
        type: Constants.LoginActions.JSON_RESPONSE,
        message: message
    }
}

function setResponse(json,dispatch){
    var token = "";
    var rol = "";
    if(json.status == 200){
        token = json.data.accessToken;
        rol = json.data.role;
        sessionStorage.setItem("session", JSON.stringify({token: token, rol: rol}));
    }
    else{
        if(json.status == 401){
            return dispatch(setMessage("Nombre de usuario o password incorrecto"));
        }
        else{
            return dispatch(setMessage("Problemas tratando de autenticar al usuario, intente más tarde"));
        }
    }
    return dispatch(setUserReducerData(token, rol));

}

export function loginAction(user, password) {
    return (dispatch, getState) => {
        let stateLogin = getState().LoginReducer;
        var url = stateLogin.loginServer+stateLogin.loginEndPoint;
        dispatch(loginStatus(Constants.LoginStatus.LOADING_ACTIVE));
        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept' : '*/*',
                'Content-Type' : 'application/json'
            },
            contentType: "application/json",
            dataType: "json",
            body: JSON.stringify({
                username: user,
                password: password,
                appId:4
            })
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                dispatch(loginStatus(Constants.LoginStatus.LOADING_INACTIVE));
                return dispatch(setResponse(json, dispatch));

            }).catch(function (perror) {
                dispatch(loginStatus(Constants.LoginStatus.LOADING_INACTIVE));
                return dispatch(setMessage("Ocurrió un error al autenticar al usuario: " + perror));
            });
    }
}
