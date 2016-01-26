'use strict';

var React = require('react-native');
var {
  DeviceEventEmitter,
  Navigator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;
var styles = require('../utils/styles');
var ShowList = require('./show-list');
var NavigationBar = require('react-native-navbar');
var Video = require('react-native-video');


var Home = React.createClass({

  getInitialState() {
    return {
      input: ''
    }
  },

  _buttonPress() {

    var sceneConfig = Navigator.SceneConfigs.FloatFromBottom;
    sceneConfig.gestures.pop.disabled = false;

    this.props.navigator.push({
      title: 'Search',
      component: ShowList,
      navigationBar: <NavigationBar title="Search"/>,
      props: {
        query: this.state.input
      }
    })
  },

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          style={styles.textbox.normal}
          onChangeText={(text) => this.setState({input: text})}
        />

        <TouchableHighlight style={styles.button} onPress={this._buttonPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>

      </View>
    );
  }

});

module.exports = Home;
