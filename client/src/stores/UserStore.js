import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import Cookies from 'js-cookie';

const CHANGE = 'CHANGE';
let _user    = {};
let _errors  = null;
let _authToken = Cookies.get('token') || null;

class UserStore extends EventEmitter {

  constructor() {
    super();

    // Registers action handler with the Dispatcher.
    AppDispatcher.register(this._registerToActions.bind(this));
  }

  getUser() {
    return _user;
  }

  getAuthToken() {
    return _authToken;
  }

  isLoggedIn() {
    return _authToken !== null;
  }

  getErrors() {
    return _errors;
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    if(action && action.errors && action.errors.status === 400) {
      // if at any point we receive a 401 from the server, it means our session is invalid
      this._killSession();
    }
    switch(action.actionType) {
      case ActionTypes.SIGN_UP:
        this._signUp(action.json, action.errors);
        break;

      default:
        return true;
    }

    this.emit(CHANGE);
    return true;
  }

  _signUp(data, errors) {
    if (data) {
      _user.id    = data.id;
      _user.email = data.attributes.email;
      _authToken  = data.attributes.auth_token;
      Cookies.set('token', _authToken);
    } else if (errors) {
      _errors = errors;
    }
  }

  _killSession() {
    _authToken = null;
    Cookies.remove('token');
  }

  // Hooks a React component's callback to the CHANGE event.
  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }

}

export default new UserStore()