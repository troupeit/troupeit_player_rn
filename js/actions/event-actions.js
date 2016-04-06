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

var ApiUtils = require('../utils/ApiUtils');
var config = require('../utils/config.js');
var EventStore = require('../stores/event-store');

class EventActions {
  fetchEvents(accessKey) {
    console.log('fetch events');

    var headers = ApiUtils.loginHeaders('GET',accessKey);

        return fetch(config.apiURL + "/events.json?company=all", headers)
          .then((response) => response.json() )
          .then((responseData) => {
              console.log("back from fetch");
	      // our api returns in asc order, reverse that.
	      responseData.reverse();
              this.fetchEventsComplete(responseData);
          })
          .catch((error) => {
              console.log("Error was" + error);
              this.fetchEventsError(error);
          });
  }

  fetchEventsComplete(data) {
    return data;
  }

  fetchEventsError(error) {
    return error;
  }

  setCurrentShow(event_id) { 
    console.log("setting current event to " + event_id)
    return event_id;
  }

  downloadEvent(event_id) {
    /* for every asset in this event */
    /* fire off an action to download the asset */
    console.log("download event " + event_id)
    return event_id;
  }
}

module.exports = alt.createActions(EventActions);
