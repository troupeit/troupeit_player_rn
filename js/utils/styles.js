'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  StyleSheet
} = React;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

/*
  Theme idea
  yellowish - c4ba3c
  deep purple - 461938
  blackblue - 09152f
  brighter blue - 4238b0
  magenta - a52757
*/

var LABEL_COLOR = '#000000';
var INPUT_COLOR = '#ffffff';
var LINK_COLOR = '#c4ba3c';
var ERROR_COLOR = '#a94442';
var HELP_COLOR = '#999999';
var BORDER_COLOR = '#cccccc';
var DISABLED_COLOR = '#777777';
var MENU_ITEM_COLOR = '#777777';
var DISABLED_BACKGROUND_COLOR = '#eeeeee';
var FONT_SIZE = 12;
var FONT_WEIGHT = '500';

var BG='#1c1d21';
var NAV_BG = '#31343d';
var MEDIUM_BG='#445878';
var GREY1='#374140';
var GREY2='#1E1E20'; /* '2A2C2B'; */
var HIGHLIGHT1='#92cdcf';
var HIGHLIGHT2="#EEEFF7";

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT,
      backgroundColor: 'transparent'
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textbox: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5,
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 10,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      color: INPUT_COLOR,
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      marginBottom: 4
    }
  },
  sublink: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: LINK_COLOR,
    backgroundColor: 'transparent',
    marginLeft: 10, 
    marginRight: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { 
       height: 1,
       width:  1, 
    }
  },
  bgimage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  navContainer: {
    flex: 1,
    height: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: 'transparent',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  barButton: { 
    tintColor: '#fff',
  },
  containerBottom: {
    height: 40,
    flex: 1, 
    alignSelf: 'stretch',
    justifyContent: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'

  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 0,
  },
  container: {
    flex: 1,
    padding: 20,
    top: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeContainer: {
    flex: 1,
    marginTop: 60,
    padding: 0,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    height: (screenHeight)
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { 
       height: 1,
       width:  1, 
    }
  },
  welcomeFinePrint: {
    fontSize: 14,
    justifyContent: 'flex-start',
    color: '#fff',
    backgroundColor: 'transparent',
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { 
       height: 1,
       width:  1, 
    }
  },
  homePIN: {
    fontSize: 40,
    justifyContent: 'flex-start',
    color: '#fff',
    fontFamily: 'courier',
    textAlign: 'center',
    backgroundColor: '#000',
    margin: 20,
    padding: 20,
  },
  welcomeerror: {
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'red',
    margin: 10,
    borderRadius: 8,
    padding: 4
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  navBar: {
    backgroundColor: NAV_BG,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: 'white'
  },
  configButton: {
    padding: 23
  },
  downloadTopButton: {
    padding: 23
  },
  downloadButton: {
    padding: 0
  },
  eventLeft: {
    flex:1,
  },
  eventRight: {
    width: 30,
  },
  eventListItemView_even: { 
    padding: 10,
    backgroundColor: GREY1,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  eventListItemView_odd: { 
    padding: 10,
    backgroundColor: GREY2,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  eventListItemTitle: { 
    fontFamily: 'System',
    color: '#fff',
  },
  eventListItemSeq: { 
    fontFamily: 'System',
    color: '#fff',
    textAlign: 'right',
    paddingRight: 10,
  },
  eventListItemDate: { 
    fontFamily: 'System',
    color: '#fff',
  },
  eventListItemCompany: { 
    fontFamily: 'System',
    fontSize: 12,
    color: '#ccc',
  },
  eventDetailLeftText: { 
    fontFamily: 'System',
    fontSize: 12,
    color: '#ffffff',
  },
  cueContainer: { 
    flexDirection: 'row',
  },
  cueLeft: { 
    width: 40
  },
  cueRight: { 
    flex: 1    
  },
  showDetailTitle: { 
    paddingTop: 10,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 16
  },
  showDetailFirstLine: { 
    paddingTop: 10,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 12
  },
  showDetailLastLine: { 
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#fff',
    fontSize: 12,
    borderStyle: 'solid'
  },
  showDetailHeader: { 
    paddingLeft: 10,
    color: '#fff',
    fontSize: 12
  },
  showItemListView: { 
    flex: 1,
    alignSelf: 'stretch'
  },
  showItemNoteView: { 
    padding: 10,
    backgroundColor: '#09152f',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  showItemStartTime: {
    fontFamily: 'System',
    color: '#fff',
  },
  showItemCueTime: {
    fontFamily: 'System',
    color: '#fff',
  },
  cueTitle: {
    fontFamily: 'System',
    color: '#fff',
    padding: 5,
    paddingTop: 0,
    fontWeight: 'bold'
  },
  showItemNote: {
    fontFamily: 'System',
    color: '#fff',
  },
  showItemSoundCue: {
    fontSize: 10,
    color: '#ccc',
  },
  cueTimeBar: { 
    flexDirection: 'row',
  },
  cueTimeElement: { 
    flex: 1,
    color: '#c4ba3c',
    borderStyle: 'solid',
    padding: 5,
    fontFamily: 'System',
    textAlign: 'right',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#3D3C3A'
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 55,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#02020d'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    left: 20,
    fontSize: 15,
    color: '#02020d',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  loadingContainer: {
    marginTop: 250,
    marginLeft: 120
  },
  loadingText: {
    fontSize: 14,
    left: 155,
    top: 200
  },
  menuitem: {
    color: MENU_ITEM_COLOR
  },
  menu: {
    flex: 1,
    height: 800,
    width: 300,
    backgroundColor: '#000000'
  },
  showList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  currentTrack: {
    justifyContent: 'flex-end',
    backgroundColor: '#3D3C3A',
  },
  currentTrackText: {
    top: 6,
    color: 'white',
    fontSize: 12
  },
  cue_section_view: {
    padding: 5,
    backgroundColor: '#333333',
  },
  cue_section_text: {
    color: HIGHLIGHT1,
    padding: 5,
  },
  fileview: { 
    padding: 10,
    backgroundColor: '#222222',
    borderBottomColor: '#111111',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  filetext: { 
    color : 'white',
  },
  play: {
    width: 35,
    height: 35
  },
  pause: {
    width: 35,
    height: 35
  },
  backgroundImage: {
    flex: 1,
    top: -10,
    resizeMode: Image.resizeMode.contain, // or Image.resizeMode.stretch
  },
  webView: {
    height: 450,
  },
  trackImage: {
    height: 100,
    width: 100
  }, 
  /* colors for cues */
  red_bg: {
    backgroundColor: '#cc4946',
  },
  blue_bg: {
    backgroundColor: '#2a72b5',
  },
  cyan_bg: {
    backgroundColor: '#3a92ab',
  },
  green_bg: {
    backgroundColor: '#008a8a',
  },
  yellow_bg: {
    backgroundColor: '#c47d15',
  },
  purple_bg: {
    backgroundColor: '#9a5bbc',
  },
  brown_bg: {
    backgroundColor: '#d35500',
  }

});

module.exports = stylesheet;
