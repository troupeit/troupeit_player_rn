var alt = require('../alt')

class PlayerActions {

  update(data) {
      return data;
  }

  updatePlayingStatus(status) {
      return status;
  }

}

module.exports = alt.createActions(PlayerActions);
