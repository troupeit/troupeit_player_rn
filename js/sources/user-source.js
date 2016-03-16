var UserActions = require('../actions/user-actions');
var config = require('../utils/config.js')

import React, {
  AsyncStorage
} from 'react-native';


var UserSource = { 

  fetchUser: function () {
    // returning a Promise because that is what fetch does.
    return new Promise(function (resolve, reject) {
	    // TODO: I don't know what happens here if asyncstorage has an issue
	    value = AsyncStorage.getItem(config.storage_access_key + "login");
	    resolve(value);
	});
  }
};


module.exports = UserSource;
