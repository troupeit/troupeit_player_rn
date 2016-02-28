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
   //this.on('init', this.bootstrap);
   //this.on('bootstrap', this.bootstrap);

   this.bindListeners({
       handleFetchEvents: EventActions.FETCH_EVENTS,
       handleFetchEventsComplete: EventActions.FETCH_EVENTS_COMPLETE,
       handleFetchEventsError: EventActions.FETCH_EVENTS_ERROR,
   });
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

  getState() {
    return this.getState()
  }

}

module.exports = alt.createStore(EventStore, 'EventStore');
