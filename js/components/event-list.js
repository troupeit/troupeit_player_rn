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

var {ControlledRefreshableListView} = require('react-native-refreshable-listview');

var styles = require('../utils/styles');
var config = require('../utils/config.js');

var EventStore = require('../stores/event-store');
var EventActions = require('../actions/event-actions');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var EventList = React.createClass({
  getInitialState: function() {
    return { dataSource: ds.cloneWithRows([]), 
             isRefreshing: true }
  },
  componentDidMount: function() {
    EventStore.listen((data) => {
      console.log("event store updated");
      this.setState({dataSource: ds.cloneWithRows(data.eventList) });
    });

    EventActions.fetchEvents(this.props.currentUser);
  },
  reloadEvents: function() {
    console.log("reloadevents");
    return EventActions.fetchEvents(this.props.currentUser);
  },
  renderEvent: function(event) {
    return <View style={styles.eventListItemView}>
           <Text style={styles.eventListItemTitle}>
           {event.title}
           </Text>
           <Text style={styles.eventListItemCompany}>
           {event.company.name}
           </Text>
           </View>
  },
  render: function() {
       return ( 
               <View style={styles.homeContainer}>
               <Text style={styles.welcome}>Your events</Text>
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => this.renderEvent(rowData)}
    />
               </View>
        );
  },

});

module.exports = EventList;
