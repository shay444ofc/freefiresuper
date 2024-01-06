const { searchPlayerById, searchPlayerByNickname, searchGuildById } = require(__dirname+"/src/Search.js");
const { getActiveWebEvents, WebEvent} = require(__dirname+"/src/WebEvents.js");
const { overview } = require(__dirname+"/src/VersionUtils.js");
const { generateRedeemCode, RedeemCode } = require(__dirname+"/src/Rewards.js")

module.exports = {
    version:{
        overview
    },
    player:{
        searchPlayerById,
        searchPlayerByNickname
    },
    guild:{
        searchGuildById
    },
    rewards:{
        generateRedeemCode,
        RedeemCode
    },
    events:{
        getActiveWebEvents,
        WebEvent
    }
}