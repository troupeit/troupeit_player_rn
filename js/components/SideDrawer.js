import React, { Text, View, Component, StyleSheet, PropTypes } from 'react-native'
import Drawer from 'react-native-drawer'

class SideDrawerContent extends React.Component {
    render() { 
      return (
              <Text>Hey thar</Text>
      );
    }
}

export default class SideDrawer extends Component {
  render() {
    return (
      <Drawer
        ref={c => this.drawer = c} /** Assigning a drawer object into the class. Keep in mind! */
        type="overlay"
        content={<SideDrawerContent />}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        {
          React.Children.map(
            this.props.children, c => React.cloneElement(c, {route: this.props.route})
          )
        }
      </Drawer>
    )
  }
}


SideDrawer.propTypes = {
  children: PropTypes.node,
  route: PropTypes.object,
}

var drawerStyles = {
  drawer: { backgroundColor: '#ffffff' },
  main: { paddingLeft: 3 }
}
