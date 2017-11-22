import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

const CHANGE = 'CHANGE';
let _site    = {};
let _errors  = null;

class SiteStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(this._registerToActions.bind(this));
  }

  getSite() {
    return _site;
  }

  getErrors() {
    return _errors;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.CREATE_SITE:
        this._createSite(action.json, action.errors);
        break;

      default:
        return true;
    }

    this.emit(CHANGE);
    return true;
  }

  _createSite(data, errors) {
    if (data) {
      _site.id = data.id;
      _site.url = data.attributes.url;
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