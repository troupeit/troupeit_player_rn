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

class ShowActions {
  fetchShow(accessKey, show) {
    console.log('fetch events');
    
    // TODO: do we have it cached, if so, return the cached data..

    var headers = ApiUtils.loginHeaders('GET',accessKey);
        // i.e. https://troupeit.com/shows/56c10e8160393a094c00019a.json
        return fetch(config.apiURL + "/shows/" + show._id.$oid + ".json", headers)
          .then((response) => response.json() )
          .then((responseData) => {
              this.fetchShowComplete(responseData);
          })
          .catch((error) => {
              this.fetchShowError(error);
          });
  }

  fetchShowComplete(data) {
    return data;
  }

  fetchShowError(error) {
    return error;
  }
}

module.exports = alt.createActions(ShowActions);
