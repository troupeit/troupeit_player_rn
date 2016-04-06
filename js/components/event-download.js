'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
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
var utils = require('../utils/troupeit_utils.js');

var EventStore = require('../stores/event-store');
var EventActions = require('../actions/event-actions');
var ShowStore = require('../stores/show-store');
var ShowActions = require('../actions/show-actions');

var CurrentTrackFooter = require('./current-track.js');

var Actions = require('react-native-router-flux').Actions;

var moment = require('moment-timezone');

var ProgressBar = require('react-native-progress-bar');
  
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects

// calendar icon from https://icons8.com/web-app/for/ios7/calendar
var base64Calicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABkklEQVRoQ+1Z7XHCMAx9TADdpBuwAmzACDAJHaEjtBuwAaMAE9BzLunljMFPcqzzBfGPQ9LT08dzghfgPjsARwCr3vwK4ADgm3OnrdQ4CxLiMiIxuAQyH6Q/a6bGYYnc+0wG+/g7m2jOTo0zKyLxXL6qWtyRXIW1v0twun0NDqm5fJaABEBLIvhJca7BgZl39ewK2WhwOp+3IxLmcBlV95aQZGEDHsw1OKKOBEH4GpEJJPaVDkQpjohIaaVr+juRmtXVxJ5vRzTVaMZnfI40k5QmEfZA1MS28pnvjrCP9FaVZnG8I2ylrOyyHTkD+LTKhsT5AbCNbLNEhncDEsPMLN5lmsgrEdC8lKUYl8RxIuOKllRyqjjekakqOVUcuiNmckQCqVWLjG9mpibi8tv3qLay0TviHfGOpHXj2YjSo2UmRySQWrXI+GZmaiK+7L7slZbdR6u10TKTIxJIrFonAGsyuJXZL4CN9F8Uq+RKcbIneymAlb8Tsao0i/PfkdTdNhukFbtbkLL4Dr2V5Ng8ujv/P+T316gpGiPZAAAAAElFTkSuQmCC";
var base64Listicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABCklEQVRoQ+2X7QnCMBiEn06gG6gTqJPpCLqJG6kb6AS6gZIfhVJUkvRCJJzQf2/uzX20hx2N/LpGeGAi/+akHbEjhRQYRusMbEZ7LsC20G4p7JDI6wtyP7MHdsBSeoN8sBtwBE4BIoXIA5jn7y1yMpBZpRJ5ArMi18kHvfcJSXEkRCs8i/y90pOBxOFTtMKLvR6tun74AEhvowJzIaqUVOHYEZWSKhw3u0rJCThudjf7hPj8OupmLySsBtaFqNFRh9KkI/7PrgtIEpKb3c2eFJj4YTd7vFYVJpvskQo66lY26YibXReQJCQ3u5s9KTDxw272eK0qTDbZIxV01K20IzotNUh2RKOjDuUN5IdIM7DXGD4AAAAASUVORK5CYII=";

var EventDownload = React.createClass({
  getInitialState: function() {
    return { 
      showdata: null,
      dataSource: ds.cloneWithRows([]), 
      selectedTab: 0
    }
  },
  compute_start_time: function(seq) { 
    /* get the start time for a single sequence id. Since they display
     * out of order of order we have to recalc them. */
    var starttime = moment(this.state.showdata.show.show.door_time);
    for (var i=0; i < seq-1; i++) {
	    starttime.add(this.state.showdata.show.show.show_items[i].duration, 'seconds');
    }
    return starttime;
  },
  componentDidMount: function() {
    var $this = this;
    this.unlisten = ShowStore.listen((data) => {
      console.log("showstore event fired");
      this.setState({showdata: data});
      this.setState({dataSource: ds.cloneWithRows(data.show.filelist) });
    });

    ShowActions.fetchShow(this.props.currentUser, this.props.event.shows[this.state.selectedTab]);
    EventActions.setCurrentShow(this.props.event.shows[this.state.selectedTab]);
  },
  componentWillUnmount: function() { 
    this.unlisten();
  },
  renderCue: function(cue) {
    return (<View style={[styles.showItemNoteView, styles[cue.color]]}>
              <View style={styles.cueContainer}>
                <View style={styles.cueRight}>
                  <Text style={styles.showItemNote}>
                  {cue.filename} 
                  </Text>
                </View>
              </View>

            <ProgressBar
               fillStyle={{}}
               backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
               style={{marginTop: 10, width: 300}}
               progress={this.state.progress}
            />

            </View>
    );
  },
  switchTab: function(tabid) { 
      this.setState({selectedTab: tabid});
      ShowActions.fetchShow(this.props.currentUser, this.props.event.shows[tabid]);
      EventActions.setCurrentShow(this.props.event.shows[this.state.selectedTab]);
  },
  renderTabItems: function() { 
    var $this = this;
    // render a tab for each day of the event
    var show_n = 0;
    var tabitems = [];

    this.props.event.shows.map(function(sh) { 
         var isSelected = false;
         if (show_n == $this.state.selectedTab) { isSelected = true; }

         tabitems.push(<TabBarIOS.Item
                     key={sh._id.$oid}
                     title={moment(sh.door_time).format('ll')}
                     icon={{uri: base64Listicon, scale: 2}}
                     selected={isSelected}
                     onPress={$this.switchTab.bind($this, show_n)}>
         <ListView
           dataSource={$this.state.dataSource}
           renderRow={(rowData) => $this.renderCue(rowData)}
           style={styles.showItemListView}
         />
              </TabBarIOS.Item>
            );
        show_n = show_n + 1;
    });

    return tabitems;
  },
  render: function() {
    // render the entire view -- this code is quite similar to
    // ShowPanel.js.jsx but with iOS objets.

    if (! this.state.showdata) {
      // punt if no data.
      return (      
        <View style={styles.homeContainer}>
		    <Text style={styles.welcome}>Downloading show...</Text>
		    <ActivityIndicatorIOS
		    animating={true}
		    style={[styles.centering, {height: 120}]}
		    size="large"
		    /> 
		    </View>
    	     )
    } 

    return ( 
      <View style={styles.homeContainer}>
        <TabBarIOS
            tintColor="white"
            barTintColor="#461938">
            {this.renderTabItems()}
        </TabBarIOS>
      </View>
        );
  },

});

module.exports = EventDownload;
