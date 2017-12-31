var keyMirror = require('fbjs/lib/keyMirror');

const ServerConstants = keyMirror({
  SIGN_UP: null,
  SIGN_OUT: null,
  LOGIN: null,
  CREATE_SITE: null,
  GET_USER: null,
  GET_TUTORIALS: null,
  CREATE_TUTORIAL: null,
  CREATE_TUTORIAL_ITEM: null,
});

export default ServerConstants;