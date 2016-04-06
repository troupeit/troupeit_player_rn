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

var Button = require('react-native-button');
var {Icon, } = require('react-native-icons');

var {ControlledRefreshableListView} = require('react-native-refreshable-listview');
var Drawer = require('react-native-drawer');

var styles = require('../utils/styles');
var config = require('../utils/config.js');

var EventStore = require('../stores/event-store');
var EventActions = require('../actions/event-actions');
var EventDownload = require('./event-download');

var UserActions = require('../actions/user-actions');
var UserStore = require('../stores/user-store');

var Actions = require('react-native-router-flux').Actions;
var moment = require('moment');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

var EventList = React.createClass({
  getInitialState: function() {
    this._rendered = false;

    return { dataSource: ds.cloneWithRows([]),
             isRefreshing: true }
  },
  userChanged(userdata) { 
    console.log('userchanged in eventlist fired' + userdata.User);
    this.setState({ currentUser: userdata.User });
    EventActions.fetchEvents(this.state.currentUser);
  },
  componentDidMount: function() {
    UserStore.listen(this.userChanged);
    EventStore.listen((data) => {
      console.log("event store updated");
      this.setState({dataSource: ds.cloneWithRows(data.eventList) });
    });
  },
  reloadEvents: function() {
    console.log("reloadevents");
    return EventActions.fetchEvents(this.props.currentUser);
  },
  
  _ItemClick: function(selectedEvent) { 
    console.log("click");
    console.log(selectedEvent);
    Actions.eventDetail({event: selectedEvent, title: selectedEvent.title, currentUser: this.state.currentUser});
  },

  _DLClick: function(selectedEvent) { 
    console.log("clickDL");
    console.log(selectedEvent);
    Actions.eventDownload({event: selectedEvent, title: selectedEvent.title, currentUser: this.state.currentUser});
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

    return (
<TouchableHighlight onPress={this._ItemClick.bind(this, event)}>
  <View style={bgstyle}>
    <View style={styles.eventLeft}>
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
    <View style={styles.eventRight}>
      <Button onPress={this._DLClick.bind(this, event)}>
      <Icon
             name='fontawesome|download'
             size={20}
             width={20}
             height={20}     
             color='grey'
             style={styles.downloadButton} />
      </Button>
    </View>
  </View>
</TouchableHighlight>
          )
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
