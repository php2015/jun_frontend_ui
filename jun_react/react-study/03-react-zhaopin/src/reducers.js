import {combineReducers} from 'redux';
import {auth} from './auth.js';
import {counter} from './redux.index';

export default combineReducers({auth, counter});