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
var Swiper = require('react-native-swiper')

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

// calendar icon from https://icons8.com/web-app/for/ios7/calendar
var base64Calicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABkklEQVRoQ+1Z7XHCMAx9TADdpBuwAmzACDAJHaEjtBuwAaMAE9BzLunljMFPcqzzBfGPQ9LT08dzghfgPjsARwCr3vwK4ADgm3OnrdQ4CxLiMiIxuAQyH6Q/a6bGYYnc+0wG+/g7m2jOTo0zKyLxXL6qWtyRXIW1v0twun0NDqm5fJaABEBLIvhJca7BgZl39ewK2WhwOp+3IxLmcBlV95aQZGEDHsw1OKKOBEH4GpEJJPaVDkQpjohIaaVr+juRmtXVxJ5vRzTVaMZnfI40k5QmEfZA1MS28pnvjrCP9FaVZnG8I2ylrOyyHTkD+LTKhsT5AbCNbLNEhncDEsPMLN5lmsgrEdC8lKUYl8RxIuOKllRyqjjekakqOVUcuiNmckQCqVWLjG9mpibi8tv3qLay0TviHfGOpHXj2YjSo2UmRySQWrXI+GZmaiK+7L7slZbdR6u10TKTIxJIrFonAGsyuJXZL4CN9F8Uq+RKcbIneymAlb8Tsao0i/PfkdTdNhukFbtbkLL4Dr2V5Ng8ujv/P+T316gpGiPZAAAAAElFTkSuQmCC";
var base64Listicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABCklEQVRoQ+2X7QnCMBiEn06gG6gTqJPpCLqJG6kb6AS6gZIfhVJUkvRCJJzQf2/uzX20hx2N/LpGeGAi/+akHbEjhRQYRusMbEZ7LsC20G4p7JDI6wtyP7MHdsBSeoN8sBtwBE4BIoXIA5jn7y1yMpBZpRJ5ArMi18kHvfcJSXEkRCs8i/y90pOBxOFTtMKLvR6tun74AEhvowJzIaqUVOHYEZWSKhw3u0rJCThudjf7hPj8OupmLySsBtaFqNFRh9KkI/7PrgtIEpKb3c2eFJj4YTd7vFYVJpvskQo66lY26YibXReQJCQ3u5s9KTDxw272eK0qTDbZIxV01K20IzotNUh2RKOjDuUN5IdIM7DXGD4AAAAASUVORK5CYII=";


var EventDetail = React.createClass({
  getTitle: function(cue) { 
    if (cue.act) {
      if (cue.act.title != null) {
        var title = cue.act.stage_name + ": " + cue.act.title;
      } else {
        var title = cue.act.stage_name;
      }

      var sound_cue = (<Text style={styles.showItemNote}>
                       {cue.act.sound_cue}
                       </Text>
		       );
    } else {
      var title = cue.note;
    }

    if (title == undefined) {
      title = "*** DELETED ACT ***"
    }
      return title;
  },
  getInitialState: function() {
      var getSectionData = (dataBlob, sectionID) => {
	  return dataBlob[sectionID];
      }
      
      var getRowData = (dataBlob, sectionID, rowID) => {
	  return dataBlob[sectionID + ':' + rowID];
      }
      
      return { 
	  showdata: null,
	  dataSource: new ListView.DataSource({
	      getSectionData          : getSectionData,
	      getRowData              : getRowData,
	      rowHasChanged           : (row1, row2) => row1 !== row2,
	      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
	  }),
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
    this.unlisten = ShowStore.listen((data) => {
	console.log("showstore event fired");
	this.setState({showdata: data});
	
	var silength = data.show.show.show_items.length,
        sectionIDs = [],
        rowIDs = [],
	dataBlob = [];
	
	// we're just going to push the index into show_items for each one
	for (var i=0; i < silength; i++) {
	    rowIDs[i] = [];
	    sectionIDs.push(i);

            dataBlob[i] = data.show.show.show_items[i];
	    
	    var files = this.filesForAct(data.show.show.show_items[i]);
	    for (var j=0; j < files.length; j++) {
		rowIDs[i].push(j);
		dataBlob[i + ":" + j] = files[j]
		console.log(files[j]);
	    }
	}
	
	this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs) });
    });
      
    ShowActions.fetchShow(this.props.currentUser, this.props.event.shows[this.state.selectedTab]);
  },
  componentWillUnmount: function() { 
    this.unlisten();
  },
  filesForAct: function(cue) {
    var files = [];
    for (var i=0; i < this.state.showdata.show.filelist.length; i++) { 
      if (this.state.showdata.show.filelist[i].act_id.$oid == cue.act_id.$oid) {
        files.push(this.state.showdata.show.filelist[i]);
      }
    }

    return files;
  },
  renderSectionHeader: function(cue,id) { 
    var cue_start = this.compute_start_time(cue.seq);
    var cue_start_s = this.compute_start_time(cue.seq).tz(this.props.event.time_zone).format('LT');

      return (
	  <View>
              <Text style={styles.cueTimeElement}>
              {cue_start_s}
	      </Text>

	      <Text style={styles.cueTitle}>
              {this.getTitle(cue)}
              </Text>
	  </View>
      );
  },
  renderFile: function(filedata) {
    // render a player/controller line for a file in an act. 
    return (<View style={styles.fileview}>
	      <Text style={styles.filetext}>{filedata.filename}</Text>
              </View>
	     );
  },
  renderCue: function(cue) {
    // deprecated function, leaving in until we get things working.
    var title = this.getTitle(cue);
    var sound_cue = undefined;
    
    var cue_start = this.compute_start_time(cue.seq);
    var cue_start_s = this.compute_start_time(cue.seq).tz(this.props.event.time_zone).format('LT');
    var cue_end = cue_start.add(cue.duration, 'seconds');
    var cue_end_s = cue_end.tz(this.props.event.time_zone).format('LT');
    var files = this.filesForAct(cue);

    return (<View style={[styles.showItemNoteView, styles[cue.color]]}>
              <View style={styles.cueTimeBar}>
                <Text style={styles.cueTimeElement}>
	        {cue_start_s}
                </Text>
                <Text style={styles.cueTimeElement}>
                  {utils.formatDuration(cue.duration, true)}
                </Text>
                <Text style={styles.cueTimeElement}>
                 {cue_end_s}
                </Text>
              </View>
            <View style={styles.cueContainer}>
            <View style={styles.cueRight}>
              <Text style={styles.showItemNote}>
              {title} 
              </Text>
            </View>
          </View>
            </View>
    );
  },
  switchTab: function(tabid) { 
      this.setState({selectedTab: tabid});
      ShowActions.fetchShow(this.props.currentUser, this.props.event.shows[tabid]);
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
           renderSectionHeader={(rowData,id) => $this.renderSectionHeader(rowData,id)} 
           renderRow={(rowData) => $this.renderFile(rowData)} 
           enableEmptySections={true}
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
      return (      <View style={styles.homeContainer}>
		    <Text style={styles.welcome}>Loading show...</Text>
		    <ActivityIndicatorIOS
		    animating={true}
		    style={[styles.centering, {height: 120}]}
		    size="large"
		    /> 
		    </View>
    	     )
    } 

    /* set up all of our date formatters */
    var thisshow = this.state.showdata.show;
    var sdate = moment(thisshow.show.show_time);
    var ddate = moment(thisshow.show.door_time);

    var hd_show_time_s = sdate.tz(this.props.event.time_zone).format('LT');
    var hd_door_time_s = ddate.tz(this.props.event.time_zone).format('LT');

    var door_date_s = ddate.tz(this.props.event.time_zone).format('dddd, MMMM Do YYYY');

    /* calculate show timings and duration */
    var show_time = moment(thisshow.show.show_time);
    var door_time = moment(thisshow.show.door_time);
    var end_time = moment(thisshow.show.door_time);
    var duration = 0;

    for (var index = 0; index < thisshow.show.show_items.length; duration += thisshow.show.show_items[index].duration, ++index);
    var duration_s = utils.formatDuration(duration, false);

    end_time.add(duration, 'seconds');
    var hd_end_time_s = end_time.tz(this.props.event.time_zone).format('h:mm a z');

    return ( 
      <View style={styles.homeContainer}>
       <Swiper style={styles.wrapper} height={100} showsButtons={false}>
       <View>
        <Text style={styles.showDetailFirstLine}>
        Information about the selected sound cue appears here when you have
        selected a track. Select a track by tapping on any track name.
        Swipe left for show details.
        </Text>
       </View>
        <View>
          <Text style={styles.showDetailFirstLine}>
              Doors: {hd_door_time_s} / Show: {hd_show_time_s}
          </Text>
          <Text style={styles.showDetailHeader}>
              Duration: {duration_s} / Ends: {hd_end_time_s} 
          </Text>
          <Text style={styles.showDetailLastLine}>
            {this.state.showdata.show.show.venue}
          </Text>
        </View>
        </Swiper>
        <CurrentTrackFooter/>
        <TabBarIOS
            tintColor="white"
            barTintColor="#461938">
            {this.renderTabItems()}
        </TabBarIOS>
      </View>
        );
  },

});

module.exports = EventDetail;
