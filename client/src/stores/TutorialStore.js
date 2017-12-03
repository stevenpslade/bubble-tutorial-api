import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
// import ServerActions from '../actions/ServerActionCreators'

const CHANGE = 'CHANGE';
let _errors  = null;
let _tutorialCreated = false;
let _tutorial = null;

class SiteStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(this._registerToActions.bind(this));
  }

  getErrors() {
    return _errors;
  }

  tutorialCreated() {
    return _tutorialCreated;
  }

  getTutorialId() {
    return _tutorial.id;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.GET_TUTORIALS:

        break;

      case ActionTypes.CREATE_TUTORIAL:
        this._createTutorial(action);
        this.emit(CHANGE);
        break;

      default:
        return true;
    }

    return true;
  }

  _createTutorial(data, errors) {
    if (data) {
      _tutorial = Object.assign({id: data.id}, data.attributes);
      _tutorialCreated = true;
    } else if (errors) {
      _errors = errors;
    }
  }

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default new SiteStore()