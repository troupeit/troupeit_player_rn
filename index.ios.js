/**
 * TroupeIT Player
 *
 * (c) 2016 TroupeIT, Inc.
 * John Adams <jna@retina.net>
 *
 **/

'use strict';

import React, {
    AppRegistry, 
    AsyncStorage, 
    Navigator,
    StyleSheet, 
    Text,
    View } from 'react-native';

import config from './js/utils/config.js';
import stylescss from './js/utils/styles';
import Alt from './js/alt.js';
import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
import UserActions from './js/actions/user-actions';
import UserStore from './js/stores/user-store';
import Menu from './js/components/menu';

import Home from './js/components/home';
import EventList from './js/components/event-list';

export default class TIPlayer extends React.Component {
    constructor(props) {  
	super(props);
	this.state =  {
	    playing: false,
	    isOpen: false,
	    accessKey: null,
	    storageChecked: false
	}

	// bind this to our methods for acccess to state and props. 
	this.render = this.render.bind(this);
	this.userChanged = this.userChanged.bind(this);
    }

    userChanged(foo) { 
	this.setState({ accessKey: foo.User  });
    }

    componentDidMount() { 
	UserStore.listen(this.userChanged);
	UserActions.fetchUser();
    }

    render() { 
	var menu = <Menu navigator={this.props.navigator}/>;
	
	if (this.state.accessKey) { 
	    var startpage = <EventList navigator={this.props.navigator} accessKey={this.state.accessKey}/>; 
	} else {
	    var startpage = <Home navigator={this.props.navigator} accessKey={this.state.accessKey} refresh={this._loadInitialState}/>;
	}
	
	return (
		<Router hideNavBar={true}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
		<Route name="home" schema="modal">
                   <Router>
                        <Route name="login" component={Home} initial={true} wrapRouter={true} title="Launch" schema="modal"/>
                   </Router>
                 </Route>
		</Router>
		);
    };

}

AppRegistry.registerComponent('troupeit_player_rn', () => TIPlayer);
