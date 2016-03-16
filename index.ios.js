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
  Navigator,
  StyleSheet, 
  Text,
  View } from 'react-native';

  import config from './js/utils/config.js';
  import stylescss from './js/utils/styles';
  import Alt from './js/alt.js';
  import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux'
  import UserActions from './js/actions/user-actions';
  import UserStore from './js/stores/user-store';
  import Error from './js/components/error'
  import Activate from './js/components/activate';
  import Launch from './js/components/launch';
  import EventList from './js/components/event-list';
  import EventDetail from './js/components/event-detail';
  import ConfigDrawer from './js/components/ConfigDrawer';

  var createConfigButton = require('./js/components/ConfigButton');

  export default class TIPlayer extends React.Component {
    constructor(props) {  
      super(props);
      this.state =  {
        playing: false,
        isOpen: false,
        currentUser: null,
        storageChecked: false
      }

      // bind this to our methods for acccess to state and props. 
      this.render = this.render.bind(this);
      this.userChanged = this.userChanged.bind(this);
    }

  userChanged(userdata) { 
    console.log('userchanged in tiplayer fired' + userdata.User);
    this.setState({ currentUser: userdata.User });
  }

  componentDidMount() { 
   UserStore.listen(this.userChanged);
   UserActions.fetchUser();
 }

 render() { 
  return (
    <Router navigationBarStyle={stylescss.navBar}
	    titleStyle={stylescss.navBarTitleText}
	    hideNavBar={false}>

    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
    <Schema name="withoutAnimation"/>
    
    <Route name="launchModal" schema="modal" initial={true}>
    <Router>
    <Route name="launch" component={Launch} wrapRouter={true} title="" schema="modal"/>
    </Router>
    </Route>
    
    <Route name="activateModal" schema="modal" type="replace" title="troupeIT Player">
      <Router>
       <Route name="activate" component={Activate} wrapRouter={true} title="troupeIT Player" schema="modal" type="replace"/>
      </Router>
    </Route>

    <Route name="error" component={Error} title="Error" type="modal"/>

    <Route name="config" component={ConfigDrawer} title="Configuration" type="modal"/>

    <Route name="eventList" 
       component={EventList} 
       title="Events" 
       type="replace" 
       renderRightButton={createConfigButton}
       schema="default"
    >
	   
    </Route>

    <Route name="eventDetail" 
    component={EventDetail} 
    title="Detail" 
    schema="default"
    leftTitle=" "
    leftButtonStyle={stylescss.eventDetailNavStyle}
    >	     
    </Route>

    </Router>
    );

};

}

AppRegistry.registerComponent('troupeit_player_rn', () => TIPlayer);
