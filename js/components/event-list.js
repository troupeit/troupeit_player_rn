'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  AppRegistry,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ListView,
  Netinfo
} = React;

var RefreshableListView = require('react-native-refreshable-listview');

var styles = require('../utils/styles');
var config = require('../utils/config.js');
var EventStore = require('../stores/event-store');
var EventView = require('./eventview');

var EventList = React.createClass({
    getInitialState: function() {
     return { data: EventStore.get(this.props.currentUser) }
    },
    render: function() {
       return ( 
               <View style={styles.homeContainer}>
               <Text style={styles.welcome}>You r events</Text>

               </View>
        );
  },

});

module.exports = EventList;
