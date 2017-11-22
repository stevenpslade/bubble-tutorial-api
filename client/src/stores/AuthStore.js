var AppDispatcher = require('../dispatchers/appDispatcher').default;
import * as Constants from '../backendInterface/constants.js';
var ActionTypes = Constants.ActionTypes;
import * as StoreUtils from '../utils/StoreUtils.js';
import LoginInterface from "../backendInterface/loginInterface";
import DialogStore from './DialogStore.react.jsx';
var jsCookie = require('js-cookie');
var _sessionID = sessionStorage.getItem('sessionID') || null;
var _userID = sessionStorage.getItem('userID') || null;
var _signupError = "";
var _sessionExpired = false;
var _error = null;
var _didInitApp = false;
var _redirectedToLogin = false;
var _createUser1Response = null;
var _createUserEmailId = null;
var _createUser2Response = null;
var _validateAffID = null;
//boilerplate
/** @constructs ReactStore **/
var AuthenticationStore = StoreUtils.createStore({
  getError: function(){
    return _error;
  },
  isLoggedIn: function(){
    return _sessionID !== null;
  },
  getSessionID: function(){
    return _sessionID;
  },
  invalidateSession: function() {
    _sessionID = null;
  },
  getUserID: function(){
    return _userID;
  },
  hasUserID: function(){
    return !_.isNull(_userID) && _userID !== undefined && _userID !== 0;
  },
  getSignupError: function() {
    return _signupError;
  },
  logout: logout,
  bail: function(){
    var s = window.location.toString();
    if (s.indexOf("login") === -1) {
      var prefix = s.search("http://") >= 0 ? "http://" : "https://";
      window.location.replace(prefix + window.location.host);
    }
  },
  sessionExpired: function() {
    if(_sessionExpired){
      return;
    } else if(_didInitApp) {
      _sessionExpired = true;
      DialogStore.purgeDialogs();
      DialogStore.pushSessionExpiredDialog();
    } else {
      this.logout();
    }
  },
  
  didRedirectToLogin(){
    return _redirectedToLogin;
  },
  
  setRedirectedToLogin(){
    _redirectedToLogin = true;
  },
  // the createuser1 endpoint is the start of the signup process where the user provides an email or casino id
  getCreateUser1Response(){
    return _createUser1Response;
  },
  // used for storing the email or id provided by the player between step 1 and 2
  setCreateUserEmailId(emailId){
    _createUserEmailId = emailId;
  },
  getCreateUserEmailId(){
    return _createUserEmailId;
  },
  // the createuser2 endpoint is the replacement for the various old signup endpoints and handles the step following createuser1 for new and loyalty users
  getCreateUser2Response(){
    return _createUser2Response;
  },
  getAffIDLandingPage(){
    return _validateAffID;
  }
});
function logout() {
  _sessionID = null;
  sessionStorage.removeItem('sessionID');
  if (AuthenticationStore != undefined) {
    AuthenticationStore.bail();
  }
}
/** @param payload : Payload **/
AuthenticationStore.dispatchToken = AppDispatcher.register(function(payload){
  /** @type Action **/
  var action = payload.action;
  if(action && action.error && action.error.status === 401){
    // if at any point we receive a 401 from the server, it means our session is invalid
    AuthenticationStore.sessionExpired();
  }
  switch(action.type){
    case ActionTypes.RECEIVE_INIT_APP:
      if(action.error !== null && action.error !== undefined){
        // the initApp failed for some reason, bail
        _sessionID = null;
        AuthenticationStore.sessionExpired();
        AuthenticationStore.emitChange();
      } else {
        _didInitApp = true;
      }
      break;
    case ActionTypes.LOGIN_RESPONSE:
      _error = action.error;
      if (action.json && action.json[0] && action.json[0] !== "error") { //in edge cases we have a response in 0 but it's 'error'
        _sessionID = action.json[0];
        // Token will always be present in a session, so the API can grab it
        try {
          sessionStorage.setItem('sessionID', _sessionID);
          jsCookie.set('bbePersistToken', 'hasLoggedIn', {expires: 7});
        } catch (err){
          _error = err;
        }
      }
      AuthenticationStore.emitChange(); //any component who cares about these objects will know
      if(_error === undefined || _error === null) {
        LoginInterface.initApp();
      }
      break;
    case ActionTypes.LOGOUT:
      logout();
      break;
    case ActionTypes.SIGNUP_RESPONSE:
      if (action.json && action.json[0] !== undefined && action.json[0] !== null) {
        // The server occasionally spits back a '0' for a user ID. That's not valid, usually it indicates something in the input was weird.
        _userID = action.json[0] === false || action.json[0] === 0 ? null : action.json[0];
        _signupError = "";
        if(_userID !== null) {
          try {
            sessionStorage.setItem('userID', _userID);
          } catch(err){
            _error = err;
          }
        }
        else{
          _signupError = action.json;
        }
        AuthenticationStore.emitChange();
      }
      break;
    case ActionTypes.CREATE_USER_1_REQUEST:
      _createUser1Response = null;
      AuthenticationStore.emitChange();
      break;
    case ActionTypes.CREATE_USER_1_RESPONSE:
      if(action.json){
        _createUser1Response = action.json;
        AuthenticationStore.emitChange();
      }
      break;
    case ActionTypes.CREATE_USER_2_REQUEST:
      _createUser2Response = null;
      AuthenticationStore.emitChange();
      break;
    case ActionTypes.CREATE_USER_2_RESPONSE:
      if(action.json){
        _createUser2Response = action.json;
        AuthenticationStore.emitChange();
      }
      break;
    case ActionTypes.VERIFY_AFF_ID_RESPONSE:
      if(action.json) {
        _validateAffID = action.json;
      } else if(action.error){
        _validateAffID = action;
      }
      AuthenticationStore.emitChange();
      break;
    default:
      break;
  }
  return true;
});
export default AuthenticationStore;