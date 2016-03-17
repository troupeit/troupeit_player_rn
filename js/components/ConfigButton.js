'use strict';

var React = require('react-native');
var {
  Text,
  View,
} = React;

var Button = require('react-native-button');
var styles = require('../utils/styles.js');

/* the button that opens the config drawer */
var {Icon, } = require('react-native-icons');

var ConfigButton = function() {
	    return (
		    <View>
		    <Button style={{color: 'green'}}>
          <Icon
             name='fontawesome|cog'
             size={20}
             width={20}
             height={20}     
             color='white'
             style={styles.configButton}
             />
		    </Button>
		    </View>
	    )
};


module.exports = ConfigButton;
