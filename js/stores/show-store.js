var alt = require('../alt');
import ApiUtils from "../utils/ApiUtils"
var config = require('../utils/config.js');
var ShowActions = require('../actions/show-actions')

/* 
 * take a look at ( for dealing with ajax in stores ) tomorrow... 
 * https://stackoverflow.com/questions/26632415/where-should-ajax-request-be-made-in-flux-app 
 */
class ShowStore {
  constructor() {

   this.show = [];

   this.bindListeners({
       handleFetchShow: ShowActions.FETCH_SHOW,
       handleFetchShowComplete: ShowActions.FETCH_SHOW_COMPLETE,
       handleFetchShowError: ShowActions.FETCH_SHOW_ERROR,
       handleDownloadShow: ShowActions.DOWNLOAD_SHOW,
       handleDownloadShowComplete: ShowActions.DOWNLOAD_SHOW_COMPLETE
   });

  }

  handleFetchShow() {
    console.log("hfs");
    this.show = [];
  }
 
  handleFetchShowComplete(show) {
    console.log("hfsc");
    this.show = show;
  }

  handleFetchShowError(error) {
    console.log("hfsse");
    this.error = error;
  }

  handleDownloadShow() {
    this.downloading = true;
    return true;
  }

  handleDownloadShowComplete() {
    this.downloading = false;
  }

  getState() {
    return this.getState()
  }

}

module.exports = alt.createStore(ShowStore, 'ShowStore');
