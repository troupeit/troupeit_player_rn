var _ = require('underscore')
var urlJoin = require('url-join')
var CollectionStore = require('./Collection')
var config = require('../utils/config.js');

const API_PATH = urlJoin(config.apiHost, '/events.json')

class TIEventStore extends CollectionStore {

  url() { return API_PATH }

  goFetch() {
    console.log("gofetch called " + this.url());
    return fetch(this.url())
      .then((items) => {
        console.log("back from fetch")

        /* TODO: handle invalid auth */
        console.log(items)
        this.reset(items)
        this.emitChange()
        return items
      })
  }
  ordered() {
    return _.sortBy(this.all(), 'position')
  }

}

module.exports = new TIEventStore
