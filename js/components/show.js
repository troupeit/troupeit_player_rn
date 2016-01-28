'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  AppRegistry,
  ListView,
  Navigator,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;
var umphAPI = require('../utils/umph-api');
var styles = require('../utils/styles');
var NavigationBar = require('react-native-navbar');
var Video = require('react-native-video');
var sortByAll = require('lodash.sortbyall');
var PlayerActions = require('../actions/player-actions')
var Icon = require('react-native-icons');
var Track = require('./track')

var Show = React.createClass({

  getDefaultProps() {
    return {
      image: ''
    }
  },

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      loading: true,
      tracks: [],
      dataSource: ds.cloneWithRows([]),
      currentTrack: {
        url: '',
        index: 0
      }
    };
  },

  componentDidMount() {

    umphAPI.getShowMetaData('https://archive.org/metadata/' + this.props.identifier)
    .then(r => {
      var data = JSON.parse(r._bodyText).files.filter(d => {
        return d.format === 'VBR MP3';
      });

      if(data.length === 0) return;

      var tracks = sortByAll(data, ['name']),
          dir = JSON.parse(r._bodyText).dir

      this.setState({
        dir: dir,
        loading: false,
        dataSource: this.state.dataSource.cloneWithRows(tracks),
        currentTrack: {
          url: 'https://archive.org' + dir + '/' + tracks[0].name,
          index: 0
        },
        tracks: tracks
      })

    });

  },

  componentWillUnmount() {
    console.log('I unmounted too!')
  },

  componentDidUnmount() {
    console.log('I unmounted woo!')
  },

  rowPressed(rowData, rowID) {

    var url = 'https://archive.org' + this.state.dir + '/' + rowData.name;

    PlayerActions.update({
      url: url,
      index: rowID,
      tracks: this.state.tracks,
      dir: this.state.dir,
      playing: true
    })

    console.log('ok i am about to push?', this.props)

    var titleConfig = { 
      title: "Now Playing"
    }

    this.props.navigator.push({
      component: Track,
      navigationBar: <NavigationBar title={titleConfig} />,
      props: {
        image: this.props.image
      },
      sceneConfig: {
        ...Navigator.SceneConfigs.FloatFromBottom,
        gestures: {}
      }
    });

  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData, rowID)}
          underlayColor='#dddddd'>
        <View>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>

      </TouchableHighlight>
    );
  },

  render: function() {
      return (

        this.state.loading ?
          <ActivityIndicatorIOS
            animating="true"
            style={[styles.centering, {height: 620}]}
            size="small"
          />:
          <ScrollView>
            <ListView
                initialListSize={25}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
              />
          </ScrollView>

      );
  },

});

module.exports = Show;
