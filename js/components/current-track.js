'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  TouchableOpacity,
  View,
} = React;
var PlayerStore = require('../stores/player-store')
var ListenerMixin = require('alt-mixins/ListenerMixin')
var sortByAll = require('lodash.sortbyall');
var PlayerActions = require('../actions/player-actions')
var Icon = require('react-native-icons');

var stylescss = require('../utils/styles');

var CurrentTrackFooter = React.createClass({

  mixins: [ListenerMixin],

  getInitialState: function() {
    return {
      song: '',
      playing: false
    }
  },

  componentDidMount: function() {
    this.listenTo(PlayerStore, this._onChange)

    var state = PlayerStore.getState()

    if(!state) return;

    this.setState({
      song: (state.tracks[state.index] || {}).title,
      playing: state.playing || false
    })

  },

  _onChange: function() {

    var state = PlayerStore.getState(),
        playing = false;

    if(state.tracks[state.index].title !== '') playing = true;

    this.setState({
      song: state.tracks[state.index].title,
      playing: playing
    })
  },

  _updatePlayingStatus: function() {

    var foo = !this.state.playing;

    PlayerActions.updatePlayingStatus(foo);

    this.setState({
      playing: foo
    })


  },

  render: function() {

    var status = this.state.playing ?
      <Icon
        name='ion|pause'
        size={20}
        color='white'
        style={stylescss.play}
      />:
      <Icon
        name='ion|play'
        size={20}
        color='white'
        style={stylescss.pause}
      />;

    var toggleSwitch = this.state.song ?
    <TouchableOpacity onPress={this._updatePlayingStatus}>
      {status}
    </TouchableOpacity>: null;

    return (
      <View style={stylescss.currentTrack}>
        {toggleSwitch}
        <Text style={stylescss.currentTrackText}>{this.state.song}</Text>
      </View>
    );
  },

});

module.exports = CurrentTrackFooter;
