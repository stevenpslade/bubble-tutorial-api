import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ServerActions from '../actions/ServerActionCreators'

const CHANGE = 'CHANGE';
let _site    = {};
let _siteId  = null;
let _errors  = null;

class SiteStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(this._registerToActions.bind(this));
  }

  setSite(site) {
    _site = site;
  }

  getSite() {
    return _site;
  }

  setSiteId(id){
    _siteId = id;
    this.emit(CHANGE);
  }

  getSiteId() {
    return _siteId;
  }

  getErrors() {
    return _errors;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.CREATE_SITE:
        this._createSite(action.json, action.errors);
        this.emit(CHANGE);

        if (_errors === null) {
          ServerActions.getTutorialsAndItems(_siteId);
        }

        break;

      default:
        return true;
    }

    return true;
  }

  _createSite(data, errors) {
    if (data) {
      _siteId  = data.id;
      _site    = {id: data.id, url: data.attributes.url};

      // reset errors
      _errors = null;
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