'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  AppRegistry,
  ListView,
  Image,
  Navigator,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;
var styles = require('../utils/styles');
var PlayerActions = require('../actions/player-actions')
var Icon = require('react-native-icons');

var Track = React.createClass({

  render: function() {
    console.log('yo what the shit', this.props.image)

      return (
        <View style={{height: 563}}>
          <Image
            style={styles.backgroundImage}
            source={{uri: this.props.image}}
          />
        </View>

      );
  },

});

module.exports = Track;
