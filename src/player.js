const needle = require("needle");
const apis = require("../core/apis.json");

async function getPlayerInfo(playerId){
    let nickRequest = await needle("get", apis.player.nick + playerId);
    let dataRequest = await needle("get", apis.player.data + playerId);
    
    let nickname, region, date, history_nick;
    
    if(nickRequest.statusCode == 200){
        nickname = nickRequest.body.nick_atual;
        region = nickRequest.body.region;
        date = dataRequest.body.data;
        nickHist = nickRequest.body.nicks_anteriores;
        
        return {
            profile:{
                nickname
            },
            account:{
                region,
                creationDate: date.includes("@") ? null : date
            },
            history:{
                nicknames: nickHist
            }
        }
    }else{
        console.log(new Error("Invalid ID."));
        return {
            error:"invalid_uid"
        }
    }
}

module.exports = {
    getPlayerInfo,
}