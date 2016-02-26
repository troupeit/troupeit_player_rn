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
var TIEvent = require('../stores/TIEvent');
var EventView = require('./eventview');

var NavigationBar = require('react-native-navbar');

var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var EventList = React.createClass({
    getInitialState: function() { 
      return { dataSource: baseDataSource.cloneWithRows(this.getMyEvents()) } 
    }, 
    loadMyEvents() {
      return TIEvent.goFetch(this.props.currentUser)
    },
    getMyEvents() {
      return TIEvent.ordered()
    },
    componentDidMount: function() { 
        var myEvents = this.getMyEvents()
        if (!(myEvents && myEvents.length)) this.loadMyEvents()
    },
    renderEvent: function(event) { 
        return <EventView event={event} />
    },
    render: function() {
       return ( 
               <View style={styles.homeContainer}>
               <Text style={styles.welcome}>Your events</Text>

               <RefreshableListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderEvent}
                  loadData={this.loadMyEvents}
                  refreshDescription="Refreshing events"
               />
               </View>
        );
  },

});

module.exports = EventList;
