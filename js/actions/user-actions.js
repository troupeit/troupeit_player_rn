var UserSource = require("../sources/user-source")
var alt = require('../alt.js')

class UserActions {

  updateUser(User) {
    return User;
  }

  fetchUser() {
      return (dispatch) => {
          // we dispatch an event here so we can have "loading" state.
          dispatch();
          
          UserSource.fetchUser()
              .then((user) => {
                  // we can access other actions within our action through `this.actions`
                  this.updateUser(user);
              })
              .catch((errorMessage) => {
                  this.userFailed(errorMessage);
              });
      }
  }

  UserFailed(errorMessage) {
    return(errorMessae);	
  }

}

module.exports = alt.createActions(UserActions);
