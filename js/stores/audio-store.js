var alt = require('../alt');
import ApiUtils from "../utils/ApiUtils"
var config = require('../utils/config.js');
var AudioActions = require('../actions/audio-actions')

/* 
 * take a look at ( for dealing with ajax in stores ) tomorrow... 
 * https://stackoverflow.com/questions/26632415/where-should-ajax-request-be-made-in-flux-app 
 */
class AudioStore {
  constructor() {

   this.show = [];

   this.bindListeners({
       handleFetchAudio: AudioActions.FETCH_AUDIO,
       handleFetchAudioComplete: AudioActions.FETCH_AUDIO_COMPLETE,
       handleFetchAudioError: AudioActions.FETCH_AUDIO_ERROR,
   });

  }

  handleFetchAudio() {
    console.log("hfa");
    this.show = [];
  }
 
  handleFetchAudioComplete(show) {
    console.log("hfac");
    this.show = show;
  }

  handleFetchAudioError(error) {
    console.log("hfse");
    this.error = error;
  }

  getState() {
    return this.getState()
  }

}

module.exports = alt.createStore(AudioStore, 'AudioStore');
