'use strict';

var React = require('react-native');
var {
  AlertIOS,
  ActivityIndicatorIOS,
  AsyncStorage,
  AppRegistry,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var styles = require('../utils/styles');
var config = require('../utils/config.js');

var NavigationBar = require('react-native-navbar');

var EventList = React.createClass({
    render: function() {
       return ( 
                <Text>events</Text>
        );
  },

});

module.exports = EventList;
