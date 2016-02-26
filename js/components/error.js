'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, Animated, Dimensions} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;
var styles = require('../utils/styles');

var {
  height: deviceHeight
} = Dimensions.get('window');


class Error extends React.Component {
    constructor(props){
        super (props)

        this.state = {
            offset: new Animated.Value(-deviceHeight)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.dismiss);
    }

    render(){
        return (
            <Animated.View style={[styles.container, {backgroundColor:'rgba(52,52,52,0.5)'}, 
                                  {transform: [{translateY: this.state.offset}]}]}>
                <View style={{  width:250,
                                height:200,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:'#222222',
				borderStyle: 'solid',
				borderWidth: 4,
		                borderColor:'#ff0000',
		                borderRadius: 5}}>
	    <Text style={{ color: 'white' }}>{this.props.data} </Text>
               <View style={styles.containerBottom}>
   	       <Button onPress={this.closeModal.bind(this)}
	               containerStyle={{
   		       marginTop:20,
			       padding:10, 
			       height:40,
		               overflow:'hidden', 
		               borderRadius: 4,
                               borderWidth:1,
	                       borderColor:'#ffffff',
		               backgroundColor: 'black'}}
		       style={{fontSize: 14, color: 'white'}}>
                       Close
	       </Button>
               </View>
	    </View>
            </Animated.View>
        );
    }
}


module.exports = Error;

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
