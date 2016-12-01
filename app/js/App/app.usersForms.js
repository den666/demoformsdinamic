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
import UsersTypesList from '../ReactSrc/AppUserForms/Containers/container.usersTypesList'
import { Provider } from 'react-redux';

let Reducer = combineReducers({
    formsUsersData: DemoFormsUsersReducer,
    routing: routerReducer
});

let middlewares = [Thunk, routerMiddleware];

let Store = createStore(Reducer, applyMiddleware(...middlewares));

const history = syncHistoryWithStore(browserHistory, Store);

export default class DemoUsersForms extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props);
        return  <Provider store={Store}>
                    <Router history={history}>
                        {/*<Redirect from="/" to="/users" />*/}
                        <Route path="/" component={Layout}>
                            {/*<IndexRoute path="/" component={UsersTypesList}/>*/}
                            <IndexRoute component={UsersTypesList}/>
                            {/*<Route path="dashboard" component={Dashboard} />*/}
                        </Route>
                    </Router>
                </Provider>
    }
}
