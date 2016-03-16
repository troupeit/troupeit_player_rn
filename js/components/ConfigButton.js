'use strict';

var React = require('react-native');
var {
  Text,
  View,
} = React;

var Button = require('react-native-button');

/* the button that opens the config drawer */
var ConfigButton = function() {
	    return (
		    <View>
		    <Button style={{color: 'green'}}>
		    +
		    </Button>
		    </View>


	    )
};


module.exports = ConfigButton;
