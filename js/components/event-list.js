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

var Actions = require('react-native-router-flux').Actions;

var moment = require('moment');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var EventList = React.createClass({
  getInitialState: function() {
    this._rendered = false;
    return { dataSource: ds.cloneWithRows([]), 
             isRefreshing: true }
  },
  componentDidMount: function() {
    EventStore.listen((data) => {
      console.log("event store updated");
      this.setState({dataSource: ds.cloneWithRows(data.eventList.reverse()) });
    });

    EventActions.fetchEvents(this.props.currentUser);
  },
  reloadEvents: function() {
    console.log("reloadevents");
    return EventActions.fetchEvents(this.props.currentUser);
  },
  
  _ItemClick: function(selectedEvent) { 
    console.log("click");
    console.log(selectedEvent);
    Actions.eventDetail({event: selectedEvent, title: selectedEvent.title, currentUser: this.props.currentUser});
  },

  renderEvent: function(event) {

    var eventDateStr = moment(event.startdate);

    // render odd and even rows differently
    this._rendered = !this._rendered;

    if (this._rendered) {
      var bgstyle = styles.eventListItemView_odd;
    } else {
      var bgstyle = styles.eventListItemView_even;
    }

    return <TouchableHighlight onPress={this._ItemClick.bind(this, event)}>
           <View style={bgstyle}>

           <Text style={styles.eventListItemCompany}>
           {event.company.name}
           </Text>

           <Text style={styles.eventListItemTitle}>
           {event.title}
           </Text>

           <Text style={styles.eventListItemTitle}>
           {eventDateStr.format("LLL")}
           </Text>

           </View>
           </TouchableHighlight>
  },
  render: function() {
       return ( 
               <View style={styles.homeContainer}>
                 <ListView
                   dataSource={this.state.dataSource}
                   renderRow={(rowData) => this.renderEvent(rowData)}
                 />
               </View>
        );
  },

});

module.exports = EventList;
