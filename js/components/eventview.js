
var React = require('react-native');

var {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var styles = require('../utils/styles');
var config = require('../utils/config.js');

var EventView = React.createClass({
	render: function() {
		return (
			<Text style={styles.welcome}>{this.props.event.name}</Text>
		)
	}
});