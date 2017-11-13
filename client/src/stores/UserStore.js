import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

const CHANGE = 'CHANGE';
let _user    = {};
let _errors  = {};

class UserStore extends EventEmitter {

  constructor() {
    super();

    // Registers action handler with the Dispatcher.
    AppDispatcher.register(this._registerToActions.bind(this));
  }

  // Switches over the action's type when an action is dispatched.
  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.SIGN_UP:
        this._signUp(action.payload);
        break;

      default:
        return true;
    }

    this.emit(CHANGE);
    return true;
  }

  _signUp(data) {
    if (data.data) {
        var user    = data.data;
        var email   = user.attributes.email;
        _user.email = email;
      } else if (data.errors) {
        _errors = data.errors;
      }
  }

  getUser() {
    return _user;
  }

  getErrors() {
    return _errors;
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