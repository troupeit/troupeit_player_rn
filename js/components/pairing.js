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
var EventList = require("./event-list")
var NavigationBar = require('react-native-navbar');

var PairView = React.createClass({
    _storesecret(val) { 
        try {
            AsyncStorage.setItem(config.storage_access_key, val);
            this._appendMessage('Saved selection to disk: ' + val);
        } catch (error) {
            this._appendMessage('storesecret - AsyncStorage error: ' + error.message);
        }
    },
    componentDidMount: function()  {
        var obj = {  
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': '',
                'Host': config.apiHost
            },
            body: JSON.stringify({
                'pin': this.props.apikey.toLowerCase()
            })
        }            
        var $this = this;

        fetch("https://" + config.apiHost + "/apikeys/pair", obj)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if (responseData.status != 200) { 
                    console.log("bad status");
                } else {
                    $this._storesecret(responseData.secret);
                    $this.props.setSecret(responseData.secret);
                    return;
                }
                this.props.errorfunc(responseData.errors);

                console.log($this.props);
                $this.props.navigator.pop();
            })
            .catch((error) => {
                console.warn(error);
                this.props.errorfunc("Could not connect to troupeIT API");
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
