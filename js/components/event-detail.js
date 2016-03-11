'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  AppRegistry,
  Navigator,
  TabBarIOS,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ListView,
  Netinfo
} = React;

var styles = require('../utils/styles');
var config = require('../utils/config.js');

var EventStore = require('../stores/event-store');
var EventActions = require('../actions/event-actions');
var ShowStore = require('../stores/show-store');
var ShowActions = require('../actions/show-actions');

var Actions = require('react-native-router-flux').Actions;

var moment = require('moment');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

// calendar icon from https://icons8.com/web-app/for/ios7/calendar
var base64Calicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABkklEQVRoQ+1Z7XHCMAx9TADdpBuwAmzACDAJHaEjtBuwAaMAE9BzLunljMFPcqzzBfGPQ9LT08dzghfgPjsARwCr3vwK4ADgm3OnrdQ4CxLiMiIxuAQyH6Q/a6bGYYnc+0wG+/g7m2jOTo0zKyLxXL6qWtyRXIW1v0twun0NDqm5fJaABEBLIvhJca7BgZl39ewK2WhwOp+3IxLmcBlV95aQZGEDHsw1OKKOBEH4GpEJJPaVDkQpjohIaaVr+juRmtXVxJ5vRzTVaMZnfI40k5QmEfZA1MS28pnvjrCP9FaVZnG8I2ylrOyyHTkD+LTKhsT5AbCNbLNEhncDEsPMLN5lmsgrEdC8lKUYl8RxIuOKllRyqjjekakqOVUcuiNmckQCqVWLjG9mpibi8tv3qLay0TviHfGOpHXj2YjSo2UmRySQWrXI+GZmaiK+7L7slZbdR6u10TKTIxJIrFonAGsyuJXZL4CN9F8Uq+RKcbIneymAlb8Tsao0i/PfkdTdNhukFbtbkLL4Dr2V5Ng8ujv/P+T316gpGiPZAAAAAElFTkSuQmCC";
var base64Listicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABCklEQVRoQ+2X7QnCMBiEn06gG6gTqJPpCLqJG6kb6AS6gZIfhVJUkvRCJJzQf2/uzX20hx2N/LpGeGAi/+akHbEjhRQYRusMbEZ7LsC20G4p7JDI6wtyP7MHdsBSeoN8sBtwBE4BIoXIA5jn7y1yMpBZpRJ5ArMi18kHvfcJSXEkRCs8i/y90pOBxOFTtMKLvR6tun74AEhvowJzIaqUVOHYEZWSKhw3u0rJCThudjf7hPj8OupmLySsBtaFqNFRh9KkI/7PrgtIEpKb3c2eFJj4YTd7vFYVJpvskQo66lY26YibXReQJCQ3u5s9KTDxw272eK0qTDbZIxV01K20IzotNUh2RKOjDuUN5IdIM7DXGD4AAAAASUVORK5CYII=";
var EventDetail = React.createClass({
  getInitialState: function() {
    return { 
      showdata: null,
      dataSource: ds.cloneWithRows([]), 
      currentTab: 0
    }
  },
  componentDidMount: function() {
    this.unlisten = ShowStore.listen((data) => {
      this.setState({showdata: data});
      this.setState({dataSource: ds.cloneWithRows(data.show.show_items) });
    });

    // goddammmit, how do I load many events?
    ShowActions.fetchShow(this.props.currentUser, this.props.event.shows[0]);
  },
  componentWillUnmount: function() { 
    this.unlisten();
  },
  renderCue: function(cue) { 
     <Text style={styles.eventListItemCompany}>
     test
     </Text>
  },
  render: function() {
    var $this = this;

    // render a tab for each day of the event
    var tabs = this.props.event.shows.map(function(sh) { 
      return (<TabBarIOS.Item
                     key={sh._id.$oid}
                     title={moment(sh.door_time).format('ll')}
                     icon={{uri: base64Listicon, scale: 2}}
                     selected={false}
                     onPress={() => {
                       $this.setState({
                          selectedTab: 'blueTab',
                        });
                    }}>
              </TabBarIOS.Item>
            )
    });

    // render the entire view

    if (! this.state.showdata) {
      return <Text style={styles.welcome}>Fetching show...</Text>
    } 


    return ( 
      <View style={styles.homeContainer}>
         <Text style={styles.welcome}>{this.state.showdata.show.title}</Text>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => this.renderCue(rowData)}
         />

         <TabBarIOS
            tintColor="white"
            barTintColor="darkslateblue">
            {tabs}
         </TabBarIOS>
      </View>
        );
  },

});

module.exports = EventDetail;
