'use strict';

var React = require('react-native');
var {
  AlertIOS,
  ActivityIndicatorIOS,
  AsyncStorage,
  AppRegistry,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var styles = require('../utils/styles');
var config = require('../utils/config.js');

var NavigationBar = require('react-native-navbar');

var PairView = React.createClass({
    _storesecret: function(val) { 
        try {
            AsyncStorage.setItem(config.storage_access_key, val);
            this._appendMessage('Saved selection to disk: ' + val);
        } catch (error) {
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    },
    componentDidMount: function()  {
        var obj = {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': 'troupeit.com'
            },
            body: JSON.stringify({
                'pin': this.props.apikey
            })
        }            
        var $this = this;

        console.log("start");
        fetch('https://troupeit.com/apikeys/pair', obj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.status != 200) { 
                    console.log("bad status");
                } else {
                    $this._storesecret(responseData.secret);

                    // jump to the eventlist
                    var titleConfig = { 
                      title: "Your Events"
                    }

                    $this.props.navigator.jumpTo({
                      title: 'Your Events',
                      component: EventList,
                      navigationBar: <NavigationBar title={titleConfig} />
                    });
                }
                this.props.errorfunc(responseData.errors);

                console.log($this.props);
                $this.props.navigator.pop();
            });
    }, 
    
    componentWillUnmount() {
        console.log('I unmounted!')
    },
    render: function() {
       return ( 
                <ActivityIndicatorIOS
                        animating={true}
                        style={[styles.centering, {height: 620}]}
                        size="large"/>
        );
  },

});

module.exports = PairView;
