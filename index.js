const version = require("./src/version.js");
const player = require("./src/player.js");
const server = require("./src/server.js");

module.exports = {
    version:{
        getVersionInfo:version.getVersionInfo
    },
    player:{
        getPlayerInfo:player.getPlayerInfo
    }
    server:{
        getServerStatus:server.getServerStatus
    }
}