const needle = require("needle");
const Player = require(__dirname+"/Player.js")
const { InvalidAccountIDError, InvalidGuildIDError } = require(__dirname+"/Errors.js");
//const { dateFormat } = require(__dirname+"/Region.js");

async function searchPlayerById(uid, region="BR"){
    let response = await needle("get", `https://freefireapi.com.br/api/search_id?id=${uid}&region=${region}`);
    if(!response.body.error){
        let player = new Player(response.body.basicInfo);
        return player;
    }else{
        throw new InvalidAccountIDError();
    }
}

async function searchPlayerByNickname(nickname, region="BR"){
    let response = await needle("get", `https://freefireapi.com.br/api/search_by_nick?nickname=${nickname}&region=${region}`);
    if(response.statusCode != 200){
        throw new Error("Error in the region.");
    }
    let players = [];
    response.body.accountInfoBasic.forEach((profile)=>{
        players.push(new Player(profile, region));
    });
    return players;
}

async function searchGuildById(clan_id, region="BR"){
    let response = await needle("get", `https://freefireapi.com.br/api/search_guild_id?id=${clan_id}&region=${region}`);
    if(!response.body.error){
        response.body.clanInfo.createAt = new Date(Number(response.body.clanInfo.createAt) * 1000);
        response.body.activenessRefreshTime = new Date(Number(response.body.activenessRefreshTime) * 1000);
        response.body.lastGainRpAt = new Date(Number(response.body.clanInfo.lastGainRpAt * 1000));
        response.body.claimRpAwardAt = new Date(Number(response.body.clanInfo.claimRpAwardAt) * 1000);
        return response.body;
    }else{
        throw new InvalidGuildIDError();
    }
}


module.exports = {
    searchPlayerById,
    searchPlayerByNickname,
    searchGuildById
}