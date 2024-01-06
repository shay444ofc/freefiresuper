const needle = require("needle");
const { InvalidMatchModeError, InvalidParamsError } = require(__dirname+"/Errors.js");

let matchModes = {
    "BR_CAREER": 0,
    "BR_CLASSIC": 1,
    "BR_RANKED": 2
}

class Player{
    constructor(basicInfo, region = "BR"){
        this.accountId = basicInfo.accountId;
        this.nickname = basicInfo.nickname;
        this.level = basicInfo.level;
        this.headPic = basicInfo.headPic || null;
        this.bannerId = basicInfo.bannerId || null;
        this.pinId = basicInfo.pinId || null;
        this.rank = basicInfo.rank;
        this.liked = basicInfo.liked || null;
        this.region = region;
    }
    async profile(){
        let response = await needle("get", `https://freefireapi.com.br/api/search_id?id=${this.accountId}&region=${this.region}`);
        response.body.basicInfo.lastLoginAt = new Date(Number(response.body.basicInfo.lastLoginAt) * 1000);
        response.body.basicInfo.createAt = new Date(Number(response.body.basicInfo.createAt) * 1000);
        return response.body;
    }
    async stats(matchMode){
        let url = `https://freefireapi.com.br/api/stats`;
        if(matchMode.includes("CS")){
            // Temporário
            throw new Error("The CS career has not yet been added.")
        }
        let response = await needle("get", url+`?id=${this.accountId}&match_mode=${matchModes[matchMode]}&region=${this.region}`);
        if(response.statusCode != 200){
            throw new Error("Error in the region.");
        }
        if(response.body.success == true){
            if(response.body.soloStats){
                delete response.body.success;
                return response.body;
            }else{
                throw new InvalidMatchModeError();
            }
        }else{
            throw new InvalidParamsError();
        }
    }
    async checkBanned(){
        let response = await needle("get", `https://ff.garena.com/api/antihack/check_banned?lang=pt&uid=${this.accountId}`);
        if(response.body.data.isBanned == 1){
            return true;
        }else{
            return false;
        }
    }
}

module.exports = Player;