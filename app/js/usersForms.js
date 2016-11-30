/**
 * Created by dennis on 29/11/16.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import DemoFormsUsersReducer from '../js/Reducers/DemoUsersRedux'
import Thunk from 'redux-thunk'

let Reducer = combineReducers({
    FormsUsersData: DemoFormsUsersReducer
});

let middlewares = [Thunk];

let Store = createStore(Reducer, applyMiddleware(...middlewares));