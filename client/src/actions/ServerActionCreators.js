import ActionTypes from '../constants/Constants.js';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

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

};

export default Actions;