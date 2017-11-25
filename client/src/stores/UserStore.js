import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ServerActions from '../actions/ServerActionCreators'
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
    if(action && action.errors && (action.errors.status === 400 || action.errors.status === 401)) {
      this.logout();
    }
    switch(action.actionType) {
      case ActionTypes.SIGN_UP:
        this._signUp(action.json, action.errors);
        this.emit(CHANGE);
        break;

      case ActionTypes.LOGIN:
        this._login(action.json, action.errors);
        this.emit(CHANGE);

        if(_errors === null) {
          ServerActions.getTutorialsAndItems();
        }

        break;

      case ActionTypes.SIGN_OUT:
        this.logout();
        this.emit(CHANGE);
        break;

      default:
        return true;
    }

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

  _login(data, errors) {
    if (data) {
      _authToken  = data.jwt;
      Cookies.set('token', _authToken);
    } else if (errors) {
      _errors = errors;
    }
  }

  logout() {
    _authToken = null;
    Cookies.remove('token');
    var s = window.location.toString();
    if (s.indexOf("login") === -1) {
      var prefix = s.search("http://") >= 0 ? "http://" : "https://";
      window.location.replace(prefix + window.location.host);
    }
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