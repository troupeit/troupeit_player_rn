'use strict';

var React = require('react-native');

var {
    ActivityIndicatorIOS,
    View, 
    Text, 
    StyleSheet, 
    Animated, 
    Dimensions, 
    AsyncStorage
} = React;

import config from '../utils/config.js';
import UserActions from '../actions/user-actions';
import UserStore from '../stores/user-store';

var styles = require('../utils/styles');
var Actions = require('react-native-router-flux').Actions;
var ApiUtils = require('../utils/ApiUtils');
var Launch = React.createClass({
  _validLogin(key) { 
    Actions.eventList({currentUser: key});
    Actions.dismiss();
    UserActions.updateUser(key);
  },
  _invalidLogin() { 
    Actions.activateModal();
    Actions.dismiss();
    Actions.error("Your device cannot be validated. Please reactivate this device.");
  },
  _handleKey(key) {
    /* verify an in-memory key against the server */

    if (key == null) {
      /* no key, no love */
      Actions.activateModal();
      Actions.dismiss();
    } else { 
      /* we got a key. Is this key any good? */
      var obj = ApiUtils.loginHeaders('GET', key); 

      fetch(config.apiURL + "/users/me.json", obj)
      .then((response) => response.json())
      .then((responseData) => {

       console.log(responseData);

       if (responseData.error) {
         this._invalidLogin();
       } else {
         this._validLogin(key);
       }
    }).bind(this);
    }
  },
  componentDidMount() {
    /* we will begin by loading the user's key from async storage */
    AsyncStorage.getItem(config.storage_access_key + "login").then(this._handleKey);
  },       
  render() { 
    return (
      <View style={styles.homeContainer}>
      <Text style={styles.welcome}>
      Logging you in... 
      </Text>
      <ActivityIndicatorIOS
      animating={true}
      style={[styles.centering, {height: 120}]}
      size="large"
      /> 
      </View>
      )
  }
});


module.exports = Launch;