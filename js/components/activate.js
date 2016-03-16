'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  AlertIOS,
  AsyncStorage,
  DeviceEventEmitter,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  LinkingIOS
} = React;

var config = require('../utils/config.js');
var styles = require('../utils/styles');
var NavigationBar = require('react-native-navbar');
var Video = require('react-native-video');
var TimerMixin = require('react-timer-mixin');
var DeviceInfo = require('react-native-device-info');
var Clipboard = require('react-native-clipboard');

import {Actions} from 'react-native-router-flux'

var EventStore = require('../stores/event-store');
var EventActions = require('../actions/event-actions');
var UserStore = require('../stores/user-store');
var UserActions = require('../actions/user-actions');

var Activate = React.createClass({
  mixins: [TimerMixin],
  getInitialState() {
    return {
      input: '',
      errorstr: null,
      secret: null,
      temppin: null
    }
  },
  _buttonPress() {
      this.setState({temppin: null});
      this.setState({secret: null});
      this._getNewPIN();
  },
  _checkActivationStatus() { 
      var $this = this;
      var obj = {  
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '',
              'Host': config.apiHost
          }
        }            
      console.log("about to fetch.");

      fetch(config.apiURL + "/apikeys/" + this.state.temppin + ".json", obj)
          .then((response) => response.json())
          .then((responseData) => {
              console.log(responseData);

              if (responseData.status == 'valid') { 
                  console.log("got valid response, storing secret");
		  UserActions.storeUser(responseData.uid, $this.state.secret);
		  Actions.dismiss;

                  EventActions.fetchEvents(responseData.uid + ":" + this.state.secret);
		  Actions.eventList();
              } else { 
                  /* if it fails... */
		  $this._timer = this.setTimeout(() => { this._checkActivationStatus(); }, 2000);
              }
          })
          .catch((error) => {
              console.warn(error);
              this.setState({'errorstr' : 'Could not connect to troupeIT API'});
          });
  },
  _getNewPIN() { 
      console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple
      console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone

      var obj = {  
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '',
              'Host': config.apiHost
          },
          body: JSON.stringify({
              'name': 'troupeIT Player - ' + DeviceInfo.getManufacturer() + ' ' + DeviceInfo.getModel()
          })
        }            
        var $this = this;

        fetch(config.apiURL + "/apikeys.json", obj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({temppin: responseData.temppin});
                this.setState({secret: responseData.secret});
                this.setState({errorstr: ''});

		if ($this._timer) { 
		    this.clearTimeout($this._timer);
		}
                $this._timer = this.setTimeout(() => { this._checkActivationStatus(); }, 2000);
            })
            .catch((error) => {
                console.warn(error);
                this.setState({'errorstr' : 'Could not connect to troupeIT API'});
            });
  },
  componentDidMount() {
    this._getNewPIN();
  },
  copyCode() {
    /* user clicked on our code */
    Clipboard.set(this.state.temppin);

    AlertIOS.alert('Copy PIN', 'Copied to clipboard.');
  },
  render() {
    if (this.state.errorstr) {
      var errnode = ( <Text style={styles.welcomeerror}>{this.state.errorstr}</Text> );
    } else {
      var errnode = null
    }

    if (this.state.temppin) { 
      var pinnode = ( 
        <Text style={styles.homePIN} onPress={this.copyCode}>
           {this.state.temppin}
        </Text>
      );
    } else {
      var pinnode = ( 
         <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 120}]}
            size="large"
         /> 
      );
    }

    return (
      <View style={styles.homeContainer}>
      <Image source={require('../../images/home-bg.jpg')} style={styles.bgimage}>

        <Text style={styles.welcome}>
            Activate troupeIT player at
        </Text>

        <Text style={styles.sublink}
         onPress={() => LinkingIOS.openURL(config.activationURL)}>
         {config.activationURL}
        </Text>

        {errnode}
        {pinnode}

        <View style={styles.containerBottom}>
        <Text style={styles.welcomeFinePrint}>
          When activation completes, you will be taken to your events dashboard.
        </Text>

        <TouchableHighlight style={styles.button} onPress={this._buttonPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Get a new code</Text>
        </TouchableHighlight>
        </View>
      </Image>
      </View>
    );
  }

});

module.exports = Activate;
