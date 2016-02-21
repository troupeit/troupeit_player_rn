var alt = require('../alt');
var UserActions = require('../actions/user-actions');
var UserSource = require('../sources/user-source');

class UserStore {
  constructor() {
    this.User = "";
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER,
      handleFetchUser: UserActions.FETCH_USER,
      handleUserFailed: UserActions.USER_FAILED,
    });

    this.registerAsync(UserSource);
  }

  handleUpdateUser(User) {
    this.User = User;
    this.errorMessage = null;
  }

  handleFetchUser() {
    this.User = null;
  }

  handleUserFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');
