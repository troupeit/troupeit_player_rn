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
var imageAPI = require('../utils/image-api')
var styles = require('../utils/styles');
var Show = require('./show');
var NavigationBar = require('react-native-navbar');
var CurrentTrackContainer = require('./current-track')

var ShowList = React.createClass({

  getInitialState: function() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      input: '',
      dataSource: ds.cloneWithRows([]),
      images: []
    };
  },

  componentDidMount() {

    umphAPI.getShows(this.props.query)
    .then(r => {

      //console.log('whoa man', r._bodyText)

      return JSON.parse(r._bodyText)

    })
    .then(r => {
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(r.response.docs) })
    })


    imageAPI.getImages(this.props.query)
    .then(r => {
      return JSON.parse(r._bodyText)

    })
    .then(r => {
      console.log('woot!', r)
      this.setState({ images: r.responseData.results })

    })

  },

  componentWillUnmount() {
    console.log('I unmounted!')
  },

  rowPressed(rowData) {

    console.log('ok?', this.state.images)

    this.props.navigator.push({
      component: Show,
      navigationBar: <NavigationBar title='Songs' />,
      props: {
        identifier: rowData.identifier,
        image: this.state.images[0].url
      }
    });

  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
          underlayColor='#dddddd'>
        <View>
            <View style={styles.textContainer}>
              <Text style={styles.title}
                    numberOfLines={1}>{rowData.title}</Text>
            </View>
          <View style={styles.separator}/>
        </View>

      </TouchableHighlight>
    );
  },

  render: function() {

    var elem = this.state.dataSource.$ListViewDataSource_dataBlob.s1.length > 0 ?
        <ListView
            initialListSize={25}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />:
      <ActivityIndicatorIOS
        animating={true}
        style={[styles.centering, {height: 620}]}
        size="small"
      />
    return (elem);
  },

});

module.exports = ShowList;
