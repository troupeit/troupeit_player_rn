var UserSource = require("../sources/user-source")
var alt = require('../alt.js')
var config = require('../utils/config.js')

import React, {
  AsyncStorage
} from 'react-native';

class UserActions {

  updateUser(User) {
    return User;
  }

  fetchUser() {
      return (dispatch) => {
          // we dispatch an event here so we can have "loading" state.
          dispatch();
          
          UserSource.fetchUser()
              .then((user) => {
                  // we can access other actions within our action through `this.actions`
                  this.updateUser(user);
              })
              .catch((errorMessage) => {
                  this.userFailed(errorMessage);
              });
      }
  }

  storeUser(uid,secret) { 
    console.log("store user called");
    AsyncStorage.setItem(config.storage_access_key + "login", uid + ":" + secret)
	.then((user) => {
		// we can access other actions within our action through `this.actions`
		console.log("Stored credentials (source).");
		this.updateUser(uid + ":" + secret);
	    })
	.catch((errorMessage) => {
		console.log('storesecret - AsyncStorage error: ' + error.message);
		this.userFailed(errorMessage);
	    });

    return uid + ":" + secret;
  }

  UserFailed(errorMessage) {
    return(errorMessae);	
  }

}

module.exports = alt.createActions(UserActions);
