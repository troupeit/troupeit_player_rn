/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

/* ES5 way */
import React, {
  AppRegistry,
  AsyncStorage, 
  Component,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

/* this is the old way of doing includes */ 

var Home = require('./js/components/home');
var NavigationBar = require('react-native-navbar');
var ShowList = require('./js/components/show-list');
var stylescss = require('./js/utils/styles');
var Video = require('react-native-video');
var App = require('./js/app.js')
var PlayerActions = require('./js/actions/player-actions')
var PlayerStore = require('./js/stores/player-store')
var ListenerMixin = require('alt-mixins/ListenerMixin')
var Menu = require('./js/components/menu')
var CurrentTrack = require('./js/components/current-track')
var config = require('./js/utils/config.js')

var navigation = React.createClass ({

  renderScene(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = React.cloneElement(navBar, {
        navigator: navigator,
        route: route
      });
    }

    return (
      <View style={stylescss.navContainer}>

        {navBar}
        <Component navigator={navigator} {...route.props} />
        <CurrentTrack />
      </View>
    );

  },

  render: function() {
    var titleConfig = {
      title: 'troupeIT Player',
      tintColor: '#bbbbbb'
    };

    return (
      <Navigator
        ref={(navigator) => {
          this._navigator = navigator;
        }}
        renderScene={this.renderScene}
        style={stylescss.navContainer}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
        })}
        initialRoute={{
          component: TIPlayer,
          navigationBar: <NavigationBar tintColor="#222222" title={titleConfig} hidePrev={true} prevTitle='haha' />
        }}/>
    );
  },
});

/* This is the main player page, triggered by navigation */
var TIPlayer = React.createClass({
  mixins: [ListenerMixin],

  getInitialState: function() {
    return {
      currentTrack: {
        url: ''
      },
      playing: false,
      isOpen: false,
      accessKey: null
    }
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(config.storage_access_key);
      if (value !== null){
        this.setState({accessKey: value});
        console.log('Recovered selection from disk: ' + value);
      } else {
        console.log('Initialized with no selection on disk.');
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  },

  componentDidMount: function() {
    this._loadInitialState().done();
    this.listenTo(PlayerStore, this._onChange)
  },

  _onChange: function() {
    this.setState({
      currentTrack: {
        url: PlayerStore.getState().url
      },
      playing: PlayerStore.getState().playing
    })
  },

  _playNextTrack: function() {

    var state = PlayerStore.getState(),
        index,
        url;

    if(state.index === state.tracks.length -1 ) {
      index = 0;
      url = 'https://archive.org' + state.dir + '/' + state.tracks[0].name
    } else {
      index = Number(state.index) + 1;
      url = 'https://archive.org' + state.dir + '/' + state.tracks[index].name
    }

    PlayerActions.update({
      url: url,
      index: index,
      tracks: state.tracks,
      dir: state.dir
    })
  },

  _onEnd: function() {
    this._playNextTrack();
  },
  toggle: function() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  },
  updateMenuState: function(isOpen) {
      this.setState({ isOpen: isOpen });
  },
  render: function() {
    var menu = <Menu navigator={this.props.navigator}/>;

    return (
        <View>
          <Home navigator={this.props.navigator} />

          { this.state.currentTrack.url !== '' ?
          <Video source={{uri: this.state.currentTrack.url}}
                 rate={1.0}
                 volume={1.0}
                 muted={false}
                 paused={!this.state.playing}
                 resizeMode="contain"
                 repeat={false}
                 style={stylescss.backgroundVideo}
                 onLoad={this._onLoad}
                 onEnd={this._onEnd} /> : null }
        </View>
    );
  }
});


AppRegistry.registerComponent('troupeit_player_rn', () => navigation);
