import alt from '../alt';

//
// Notes about actions in newer versions of altjs
//
// alt will dispatch automatically when an action returns
// dispatch() is no longer required, just call the function
//
// don't dispatch at end of calls, let alt do it
// 
// errors in Action code silently fail and stop execution, be careful!
//


// ths store will download audio files and put them to local disk.
var ApiUtils = require('../utils/ApiUtils');
var config = require('../utils/config.js')

class AudioActions {
  fetchAudio(url) {
    console.log('fetch audiofile');
  }

  fetchAudioComplete(data) {
    return data;
  }

  fetchAudioError(error) {
    return error;
  }
}

module.exports = alt.createActions(AudioActions);
