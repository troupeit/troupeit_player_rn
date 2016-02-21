/**
 * TroupeIT Player
 *
 * (c) 2016 TroupeIT, Inc.
 * John Adams <jna@retina.net>
 *
 **/

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

var config = require('./js/utils/config.js')
var NavigationBar = require('react-native-navbar');
var stylescss = require('./js/utils/styles');
var Video = require('react-native-video');
var Alt = require('./js/alt.js')

var PlayerActions = require('./js/actions/player-actions')
var PlayerStore = require('./js/stores/player-store')

var UserActions = require('./js/actions/user-actions')
var UserStore = require('./js/stores/user-store')

var ListenerMixin = require('alt-mixins/ListenerMixin')
var Menu = require('./js/components/menu')
var CurrentTrack = require('./js/components/current-track')
var Home = require('./js/components/home');
var EventList = require('./js/components/event-list');
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
      playing: false,
      isOpen: false,
      accessKey: null,
      storageChecked: false
    }
  },

  userChanged: function(foo) { 
    this.setState({ accessKey: foo.User  });
  },
  componentDidMount: function() {
    UserStore.listen(this.userChanged);
    UserActions.fetchUser();
  },

  render: function() {
    var menu = <Menu navigator={this.props.navigator}/>;

    if (this.state.accessKey) { 
      var startpage = <EventList navigator={this.props.navigator} accessKey={this.state.accessKey}/>; 
    } else {
      var startpage = <Home navigator={this.props.navigator} accessKey={this.state.accessKey} refresh={this._loadInitialState}/>;
    }

    return (
        <View>
          {startpage}
        </View>
    );
  }
});


AppRegistry.registerComponent('troupeit_player_rn', () => navigation);
