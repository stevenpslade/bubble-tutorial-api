import ActionTypes from '../constants/Constants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import UserStore from '../stores/UserStore';

const API_URL = process.env.REACT_APP_API_URL;

const Actions = {

  signUp(user) {
    window.fetch(API_URL + '/users', {
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
    window.fetch(API_URL + '/user_token', {
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
    window.fetch(API_URL + '/sites', {
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
      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.CREATE_SITE,
        json: data.data,
        errors: data.errors
      });
    });
  },

  getUser() {
    window.fetch(API_URL + '/get_current_user', {
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
        json: data,
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
    window.fetch(`${API_URL}/sites/${site_id}/tutorials`, {
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
        json: data,
        errors: data.errors
      });
    }).catch(function(error) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.GET_TUTORIALS,
          json: null,
          errors: error
        });
    });
  },

  addTutorial(tutorial) {
    window.fetch(`${API_URL}/sites/${tutorial.siteId}/tutorials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserStore.getAuthToken()
      },
      body: JSON.stringify({"tutorial":{
        name: tutorial.name,
        page_url: tutorial.pageUrl,
        skippable: tutorial.skippable,
        show_steps: tutorial.showSteps,
        active: true,
        user_id: tutorial.userId,
        site_id: tutorial.siteId
      }})
    })
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.CREATE_TUTORIAL,
        json: data.data,
        errors: data.errors
      });
    }).catch(function(error) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.CREATE_TUTORIAL,
          json: null,
          errors: error
        });
    });
  },

  addTutorialItem(tutorialItem) {
    window.fetch(`${API_URL}/tutorial_items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserStore.getAuthToken()
      },
      body: JSON.stringify({"tutorial_item":{
        title: tutorialItem.title,
        content: tutorialItem.content,
        order: tutorialItem.order,
        css_selector: tutorialItem.cssSelector,
        active: true,
        tutorial_id: tutorialItem.tutorialId
      }})
    })
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.CREATE_TUTORIAL_ITEM,
        json: data.data,
        errors: data.errors
      });
    }).catch(function(error) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.CREATE_TUTORIAL_ITEM,
          json: null,
          errors: error
        });
    });
  },

  deleteTutorial(tutId, siteId) {
    window.fetch(`${API_URL}/sites/${siteId}/tutorials/${tutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + UserStore.getAuthToken()
      }
    })
    .then(function(response) {
      return response;
    })
    .then(function(data) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.DELETE_TUTORIAL,
        json: data,
        errors: data
      });
    });
  },

};

export default Actions;