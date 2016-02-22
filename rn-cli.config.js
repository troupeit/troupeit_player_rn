var blacklist= require("react-native/packager/blacklist");
var config = {
    getBlacklistRE(platform) {
        return blacklist(platform,[/troupeit_player_rn.+\/node_modules\/fbjs.*/]);
    }
}
module.exports = config;
