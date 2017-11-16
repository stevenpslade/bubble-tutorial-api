import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

const CHANGE = 'CHANGE';
let _user    = {};
let _errors  = null;
let _authToken = null;

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
    switch(action.actionType) {
      case ActionTypes.SIGN_UP:
        console.log(action);
        this._signUp(action.json, action.errors);
        break;

      default:
        return true;
    }

    this.emit(CHANGE);
    return true;
  }

  _signUp(data, errors) {
    console.log(errors);
    if (data) {
        _user.email = data.attributes.email;
        _authToken  = data.attributes.email;
      } else if (errors) {
        _errors = errors;
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