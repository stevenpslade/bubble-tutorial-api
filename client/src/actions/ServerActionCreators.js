import ActionTypes from '../constants/Constants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserStore from '../stores/UserStore'

const Actions = {

  signUp(user) {
    window.fetch('http://api.stevenlocal.com:3001/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"user":{
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation
      }})
    })
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.SIGN_UP,
        json: data.data,
        errors: data.errors
      });
    });
  },

  login(user) {
    window.fetch('http://api.stevenlocal.com:3001/v1/user_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"auth":{
        email: user.email,
        password: user.password
      }})
    })
    .then(function(response) {
      if (!response.ok) {
        throw response;
      }

      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.LOGIN,
        json: data,
        errors: null
      });
    }).catch(function(error) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.LOGIN,
          json: null,
          errors: error
        });
    });
  },

  logout() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SIGN_OUT
    });
  },

  createSite(site) {
    window.fetch('http://api.stevenlocal.com:3001/v1/sites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserStore.getAuthToken()
      },
      body: JSON.stringify({"site":{
        url: site.url,
        user_id: site.user_id
      }})
    })
    .then(function(response) {
      if (!response.ok) {
          throw response;
      }

      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.CREATE_SITE,
        json: data.data,
        errors: data.errors
      });
    }).catch(function(error) {
        console.log(error);
        AppDispatcher.dispatch({
          actionType: ActionTypes.CREATE_SITE,
          json: null,
          errors: error
        });
    });
  },

  getUser() {
    window.fetch('http://api.stevenlocal.com:3001/v1/get_current_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserStore.getAuthToken()
      }
    })
    .then(function(response) {
      if (!response.ok) {
          throw response;
      }

      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.GET_USER,
        json: data.data,
        errors: data.errors
      });
    }).catch(function(error) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.GET_USER,
          json: null,
          errors: error
        });
    });
  },

  getTutorialsAndItems(site_id) {
    window.fetch(`http://api.stevenlocal.com:3001/v1/sites/${site_id}/tutorials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserStore.getAuthToken()
      }
    })
    .then(function(response) {
      if (!response.ok) {
          throw response;
      }

      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.GET_TUTORIALS,
        json: data.data,
        errors: data.errors
      });
    }).catch(function(error) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.GET_TUTORIALS,
          json: null,
          errors: error
        });
    });
  }

};

export default Actions;