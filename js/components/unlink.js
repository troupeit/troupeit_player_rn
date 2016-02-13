'use strict';

var React = require('react-native');

var {
  AsyncStorage,
  TouchableHighlight,
  StyleSheet,
  Text
} = React;

var styles = require('../utils/styles');

var UnlinkDevicebutton = React.createClass({
  _unlinkdevice: function() {
      AsyncStorage.removeItem(config.storage_access_key, val);
      this.props.callback();
  },                                           
  render: function() { 
      return (
              <TouchableHighlight style={styles.button} onPress={this._unlinkdevice} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Unlink device</Text>
              </TouchableHighlight>
             )
  }
})

module.exports = UnlinkDevicebutton;

module.exports = UnlinkDevicebutton;;
