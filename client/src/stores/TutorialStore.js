import ActionTypes from '../constants/Constants.js';
import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const CHANGE         = 'CHANGE';
let _errors          = null;
let _tutorialCreated = false;
// _tutorialData holds all tutorial data for a user
let _tutorialData    = null;
// _tutorial & _tutorialItems are for whatever tutorial is being added or edited by the user
let _tutorial        = {};
let _tutorialItems   = [];

class TutorialStore extends EventEmitter {
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

  setTutorialId(id) {
    _tutorial.id = id;
  }

  setTutorialCreated(flag) {
    _tutorialCreated = flag;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case ActionTypes.GET_TUTORIALS:
        // this._parseTutorialData(action.json);
        // this.emit(CHANGE);
        break;

      case ActionTypes.CREATE_TUTORIAL:
        this._createTutorial(action.json, action.errors);
        this.emit(CHANGE);
        break;

      case ActionTypes.CREATE_TUTORIAL_ITEM:
        this._createTutorialItem(action.json, action.errors);
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
      history.push(`/bubbles/add/${data.id}`);
    } else if (errors) {
      _errors = errors;
    }
  }

  _createTutorialItem(data, errors) {
    if (data) {
      _tutorialItems.push(Object.assign({id: data.id}, data.attributes));
    } else if (errors) {
      _errors = errors;
    }
  }

  // _parseTutorialData(data) {
  //   var dataArray = data.data;
  //   var includedArray = data.included;

  //   // if (includedArray.length === 0) {
  //   //   console.log("included member is empty; no tutorial items");
  //   //   return;
  //   // }

  //   var tutorialsArray = [];

  //   for (var i = 0; i < dataArray.length; i++) {
  //     dataArray[i]['attributes']['id'] = dataArray[i]['id'];
  //     var tutorial = { dataArray[i]['attributes'] };
  //     var tutorialItemRelationships = dataArray[i]['relationships']['tutorial_items']['data'];

  //     for (var j = 0; j < includedArray.length; j++) {
  //       var tutorialItemId = includedArray[j]['id'];

  //       for (var t = 0; t < tutorialItemRelationships.length; t++) {
  //         var relId = tutorialItemRelationships[t]['id'];

  //         if (relId === tutorialItemId) {
  //           tutorial.tutorialItems.push({ dataArray[i]['id'], includedArray[j]['attributes'] });
  //         }
  //       }
  //     }

  //     tutorialsArray.push(tutorial);
  //   }

  //   _tutorialData = tutorialsArray;

  //   console.log(_tutorialData);
  // }

  addChangeListener(callback) {
    this.on(CHANGE, callback);
  }

  // Removes the listener from the CHANGED event.
  removeChangeListener(callback) {
    this.removeListener(CHANGE, callback);
  }
}

export default new TutorialStore()