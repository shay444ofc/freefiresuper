const needle = require("needle");

async function overview(){
    let response = await needle("get", "https://server.shay444ofc.vercel.app/api/freefire/normal/overview");
    delete response.body.success;
    return response.body;
}

/*overview().then((info)=>{
    console.log(info)
})*/

module.exports = {
    overview,
}