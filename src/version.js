const needle = require("needle");
const apis = require("../core/apis.json");

async function getVersionInfo(){
    let response = await needle("get", apis.version.check);
    if(response.body.news == "true"){
        return {
            newVersionAvailable:true,
            currentVersion:response.body.last,
            newVersion:response.body.version
        }
    }else{
        return {
            newVersionAvailable:false,
            currentVersion:response.body.last,
        }
    }
}

module.exports = getVersionInfo