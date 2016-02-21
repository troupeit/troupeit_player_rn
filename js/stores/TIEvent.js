import ApiUtils from "../utils/ApiUtils"

var _ = require('underscore')
var urlJoin = require('url-join')
var CollectionStore = require('./Collection')
var config = require('../utils/config.js');

const API_PATH = config.apiHost + '/events.json';

class TIEventStore extends CollectionStore {
  url() { return API_PATH }

  goFetch(accessKey) {
      console.log("event fetch: " + this.url());
      var obj = {  
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': '',
              'X-Auth' : accessKey,
              'Host': config.apiHost
          }
      }            
      
      return fetch(this.url(), obj)
          .then((response) => response.json() )
          .then((responseData) => {
              console.log("back from fetch")
              /* TODO: handle invalid auth */
              console.log(responseData)
              this.reset(responseData)
              this.emitChange()
              return items
          })
          .catch((error) => {
              console.log("Error was" + error);
              this.setState({'errorstr' : 'Could not connect to troupeIT API'});
          });

    }
    ordered() {
        return _.sortBy(this.all(), 'position')
    }

}

module.exports = new TIEventStore
