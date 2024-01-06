const needle = require("needle");
const { InvalidParamsError, InvalidSerialNoError } = require(__dirname+"/Errors.js");

function generateRedeemCode(init){
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let size = 12 - init.length;
    let code = "";
    for(let i = 0; i < size; i++){
        code += char[Math.floor(Math.random() * char.length)];
    }
    return new RedeemCode(init+code);
}

class RedeemCode {
    constructor(code){
        this.code = code;
    }
    async verify(){
        let response = await needle("get", `https://api.shay444ofc.vercel.app/api/freefire/v1/verifyRedeemCode?code=${this.code}`);
        if(response.statusCode == 200){
            if(response.body.isValid == true){
                return true;
            }else{
                return false;
            }
        }else{
            throw new InvalidParamsError();
        }
    }
    async redeem(access_token){
        let body = {
            serialno: this.code
        }
        let headers = {
            "access-token": access_token
        }
        let response = await needle("post", `https://prod-api.reward.ff.garena.com/redemption/api/game/ff/redeem/`, body, { headers })
        body = JSON.parse(response.body);
        if(!body.msg.includes("error")){
            return {
                success: true,
                msg: body.msg
            }
        }else{
            return {
                success: false,
                msg: body.msg
            }
        }
    }
}

module.exports = {
    generateRedeemCode,
    RedeemCode
}