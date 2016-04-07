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

var ShowActions = require('../actions/show-actions');

var DownloadButton = function() {
	    return (
		    <View>
		    <Button onPress={ShowActions.downloadShow}>
          <Icon
             name='fontawesome|download'
             size={20}
             width={20}
             height={20}     
             color='white'
             style={styles.downloadTopButton}
             />
		    </Button>
		    </View>
	    )
};


module.exports = DownloadButton;
