var alt = require('../alt');
import ApiUtils from "../utils/ApiUtils"
var config = require('../utils/config.js');

/* 
 * take a look at ( for dealing with ajax in stores ) tomorrow... 
 * https://stackoverflow.com/questions/26632415/where-should-ajax-request-be-made-in-flux-app 
 */
class EventStore {

  get(accessKey) {
      console.log('fetch events');
      var obj = ApiUtils.loginHeaders('GET',accessKey);

      return fetch(config.apiURL + "/events.json", obj)
          .then((response) => response.json() )
          .then((responseData) => {
              console.log("back from fetch")

              /* TODO: handle invalid auth */
              console.log(responseData)
              this.reset(responseData)
              eventlist = responseData
              this.emitChange()
          })
          .catch((error) => {
              console.log("Error was" + error);
              this.setState({'errorstr' : 'Could not connect to troupeIT API'});
          });

    }

}

module.exports = alt.createStore(EventStore, 'EventStore');
