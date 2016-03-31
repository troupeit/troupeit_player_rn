var alt = require('../alt');
import ApiUtils from "../utils/ApiUtils"
var config = require('../utils/config.js');
var EventActions = require('../actions/event-actions')

/* 
 * take a look at ( for dealing with ajax in stores ) tomorrow... 
 * https://stackoverflow.com/questions/26632415/where-should-ajax-request-be-made-in-flux-app 
 */
class EventStore {
  constructor() {
   this.eventList = [];

   this.bindListeners({
       handleFetchEvents: EventActions.FETCH_EVENTS,
       handleDownloadEvent: EventActions.DOWNLOAD_EVENT,
       handleFetchEventsComplete: EventActions.FETCH_EVENTS_COMPLETE,
       handleFetchEventsError: EventActions.FETCH_EVENTS_ERROR,
       handleSetCurrentShow: EventActions.SET_CURRENT_SHOW
   });
  }

  handleSetCurrentShow(event_id) { 
    /* memoize the current show for download or other use */
    this.currentEvent = event_id; 
  }

  handleFetchEvents() {
    console.log("hfe");
    this.eventList = [];
  }
 
  handleFetchEventsComplete(eventList) {
    console.log("hfec");
    this.eventList = eventList;
  }

  handleFetchEventsError(error) {
    console.log("hfee");
    this.error = error;
  }

  handleDownloadEvent(event_id) {
    console.log("hfee");
  }

  getState() {
    return this.getState()
  }

}

module.exports = alt.createStore(EventStore, 'EventStore');
