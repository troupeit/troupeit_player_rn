'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
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

var config = require('../utils/config.js')
var styles = require('../utils/styles');
var PairView = require('./pairing');
var NavigationBar = require('react-native-navbar');
var Video = require('react-native-video');
var TimerMixin = require('react-timer-mixin');
var DeviceInfo = require('react-native-device-info');

var Home = React.createClass({
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
  _storeSecret(val) { 
      try {
          AsyncStorage.setItem(config.storage_access_key, val);
          console.log('Saved selection to disk: ' + val);
      } catch (error) {
          console.log('storesecret - AsyncStorage error: ' + error.message);
      }
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

      fetch("https://" + config.apiHost + "/apikeys/" + this.state.temppin + ".json", obj)
          .then((response) => response.json())
          .then((responseData) => {
              console.log(responseData);

              if (responseData.status == 'valid') { 
                  $this._storeSecret(this.state.secret);
                  $this.props.refresh();
              } else { 
                  /* if it fails... */
                  $this.setTimeout(() => { $this._checkActivationStatus(); }, 2000);
              }
          })
          .catch((error) => {
              console.warn(error);
              this.setState({'errorstr' : 'Could not connect to troupeIT API'});
          });
  },
  _getNewPIN() { 
      var obj = {  
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '',
              'Host': config.apiHost
          },
          body: JSON.stringify({
              'name': 'troupeIT Player - ' + DeviceInfo.getModel()
          })
        }            
        var $this = this;

        /* TODO: Loading symbol */
        fetch("https://" + config.apiHost + "/apikeys.json", obj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({temppin: responseData.temppin});
                this.setState({secret: responseData.secret});
                this.setState({errorstr: ''});
                this.setTimeout(() => { this._checkActivationStatus(); }, 2000);
            })
            .catch((error) => {
                console.warn(error);
                this.setState({'errorstr' : 'Could not connect to troupeIT API'});
            });
  },
  componentDidMount() {
    /* we'll only ever show this page if the index page couldn't find our accesskey */
    this._getNewPIN();
  },
  render() {
    if (this.state.errorstr) {
      var errnode = ( <Text style={styles.welcomeerror}>{this.state.errorstr}</Text> );
    } else {
      var errnode = null
    }

    if (this.state.temppin) { 
      var pinnode = ( 
        <Text style={styles.homePIN}>
           {this.state.temppin}
        </Text>
      );
    } else {
      var pinnode = ( 
         <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"
         /> 
      );
    }

    /* we're not signed in, so show the welcome page */
    return (
      <View style={styles.homeContainer}>
      <Image source={require('../../images/home-bg.jpg')} style={styles.bgimage}>

        <Text style={styles.welcome}>
            Activate troupeIT player at
        </Text>

        <Text style={styles.sublink}
         onPress={() => LinkingIOS.openURL('https://troupeit.com/activate')}>
         https://troupeit.com/activate
         </Text>
        <Text style={styles.welcome}>
            when prompted, enter the activation code below. 
        </Text>

        {errnode}
        {pinnode}

        <Text style={styles.welcomeFinePrint}>
            This code is valid for one hour. When activation completes, you will be taken to your events dashboard.
        </Text>

        <TouchableHighlight style={styles.button} onPress={this._buttonPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Get a new code</Text>
        </TouchableHighlight>
      </Image>
      </View>
    );
  }

});

module.exports = Home;
