var React = require('react-native');
var styles = require('../utils/styles');
var config = require('../utils/config.js');

var NetworkFailure = React.createClass({ 
    render: function() {
        return (
                <View style={styles.homeContainer}>
                <Text style={styles.welcome}>
                The player cannot connect to the troupeIT server. 
                </Text>
                <Text style={styles.welcome}>
                This could be due to a network error or this device may no longer be associated with your account.
                </Text>
                </View>
        );
});
