'use strict';

var React = require('react-native');
var {
  AlertIOS,
  ActivityIndicatorIOS,
  AppRegistry,
  Navigator,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;
var styles = require('../utils/styles');

var NavigationBar = require('react-native-navbar');

var PairView = React.createClass({
    getInitialState: function() {
        return { completed: false }
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
                    console.log("pop");
                } else {
                    console.log("fail");
                }
                console.log("in");
                this.props.errorfunc(responseData.errors);

                console.log($this.props);
                $this.props.navigator.pop();
            });
    }, 
    
    componentWillUnmount() {
        console.log('I unmounted!')
    },
    render: function() {
            
            var elem = this.state.completed ?
                <Pairresult /> : 
                <ActivityIndicatorIOS
                        animating={true}
                        style={[styles.centering, {height: 620}]}
                        size="large"/>;
            
            return (elem);
  },

});

module.exports = PairView;
