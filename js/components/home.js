'use strict';

var React = require('react-native');
var {
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

var styles = require('../utils/styles');
var PairView = require('./pairing');
var NavigationBar = require('react-native-navbar');
var Video = require('react-native-video');
 
var Home = React.createClass({

  getInitialState() {
    return {
      input: '',
      errorstr: null
    }
  },
  _mkerror: function(errormsg) { 
    this.setState({errorstr: errormsg});
  },
  _buttonPress() {
    var $this = this;
    var sceneConfig = Navigator.SceneConfigs.FloatFromBottom;
    sceneConfig.gestures.pop.disabled = false;

    var titleConfig = { 
      title: "Pairing"
    }

    this.props.navigator.push({
      title: 'Pair',
      component: PairView,
      navigationBar: <NavigationBar title={titleConfig} />,
      props: {
        apikey: this.state.input,
        errorfunc: $this._mkerror
      }
    })
  },

  render() {
    if (this.state.errorstr) {
        var errnode = ( <Text style={styles.welcomeerror}>{this.state.errorstr}</Text> );
    } else {
        var errnode = null
    }

    return (
      <View style={styles.homeContainer}>
      <Image source={require('../../images/home-bg.jpg')} style={styles.bgimage}>
        <Text style={styles.welcome}>
            Welcome to TroupeIT.
        </Text>

        <Text style={styles.welcome}>
            Connect your device to your account by entering your PIN.
        </Text>

        {errnode}
        <TextInput
          style={styles.textbox.normal}
          onChangeText={(text) => this.setState({input: text})}
          placeholder="PIN"
          placeholderTextColor="#666666"
        />
       <Text style={styles.link}
         onPress={() => LinkingIOS.openURL('https://troupeit.com/apikeys')}>
         Need a PIN? Head to your profile page. 
       </Text>

        <TouchableHighlight style={styles.button} onPress={this._buttonPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>LINK</Text>
        </TouchableHighlight>
      </Image>
      </View>
    );
  }

});

module.exports = Home;
