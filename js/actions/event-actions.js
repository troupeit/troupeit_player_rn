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
var config = require('../utils/config.js')

class EventActions {
  fetchEvents(accessKey) {
    console.log('fetch events');

    var headers = ApiUtils.loginHeaders('GET',accessKey);

        return fetch(config.apiURL + "/events.json?company=all", headers)
          .then((response) => response.json() )
          .then((responseData) => {
              console.log("back from fetch");
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
}

module.exports = alt.createActions(EventActions);
