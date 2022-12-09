const needle = require("needle");
const server = require("../core/server.json");

async function getServerStatus(serverName){
    let live = await needle("get", server.live);
    let advance = await needle("get", server.advance);
    let review = await needle("get", server.review);
    
    let selected = server.live;
    
    if(serverName == "live"){
        selected = live;
    }else if(serverName == "advance"){
        selected = advance;
    }else if(serverName == "review"){
        selected = review;
    }else{
        console.log(new Error("Invalid server name."));
        return  {
            error:"invalid_uid"
        }
    }
    
    if(selected){
        if(selected.statusCode != 503){
            return  {
                isOn:true
            }
        }else{
            return  {
                isOn:false
            }
        }
    }else{
        return  {
            isOn:false
        }
    }
}
module.exports = getServerStatus