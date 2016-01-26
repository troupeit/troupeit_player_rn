var alt = require('../app');
var PlayerActions = require('../actions/player-actions')

class PlayerStore {
  constructor() {

    this.bindListeners({
      onUpdate: PlayerActions.update,
      onUpdatePlayingStatus: PlayerActions.updatePlayingStatus
    });

    this.url = '';
    this.index = 0;
    this.tracks = [];
    this.dir = '';
    this.playing = false;
  }

  onUpdate({ data }) {

    this.setState({
      url: data.url,
      index: data.index,
      tracks: data.tracks,
      dir: data.dir,
      playing: data.playing
    });

  }

  onUpdatePlayingStatus(status) {

    this.setState({
      playing: status
    });
  }

  getState() {
    return this.getState()
  }
}

module.exports = alt.createStore(PlayerStore, 'PlayerStore');
