import {createStore, applyMiddleware} from 'redux';
//import {configuretSore} from 'redux';
import reduxThunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const store = createStore(userReducer, applyMiddleware(reduxThunk));

export default store;

