var alt = require('../app')

class PlayerActions {

  update(data) {
    this.dispatch({data});
  }

  updatePlayingStatus(status) {
    this.dispatch(status)
  }

}

module.exports = alt.createActions(PlayerActions);
