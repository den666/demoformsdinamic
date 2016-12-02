/**
 * Created by dennis on 29/11/16.
 */

import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Router, IndexRoute, Route, Link, browserHistory, hashHistory, Redirect } from 'react-router';
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux';
import DemoFormsUsersReducer from '../ReactSrc/AppUserForms/Reducers/DemoUsersRedux'
import Thunk from 'redux-thunk'
import Layout from '../ReactSrc/AppUserForms/Containers/container.layout'
import FormLayout from '../ReactSrc/AppUserForms/Containers/container.formLayout'
import UsersTypesList from '../ReactSrc/AppUserForms/Containers/container.usersTypesList'
import { Provider } from 'react-redux';
import ReduxConstants from '../ReactSrc/Utils/Constants/ReduxConstants'

let Reducer = combineReducers({
    formsUsersData: DemoFormsUsersReducer,
    routing: routerReducer
});

const routeMiddleware = routerMiddleware(browserHistory);

let middlewares = [Thunk, routeMiddleware];

let Store = createStore(Reducer, applyMiddleware(...middlewares));

const history = syncHistoryWithStore(browserHistory, Store);

export default class DemoUsersForms extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return  <Provider store={Store}>
                    <Router history={history}>
                        <Redirect from="/" to={ReduxConstants.Routes.USERS_HOME} />
                        <Route path={ReduxConstants.Routes.USERS_HOME} component={Layout}>
                            {/*<IndexRoute path="/" component={UsersTypesList}/>*/}
                            <IndexRoute component={UsersTypesList}/>
                            <Route path={ReduxConstants.Routes.USERS_ADD_TYPE_A} component={FormLayout} />
                            <Route path={ReduxConstants.Routes.USERS_ADD_TYPE_B} component={FormLayout} />
                        </Route>
                    </Router>
                </Provider>
    }
}