const needle = require("needle");
const { ForbiddenError, NotFoundError } = require(__dirname+"/Errors.js");


async function getActiveWebEvents(){
    let response = await needle("get", "https://freefireapi.com.br/api/freefire/external/WebEvents?region=BR");
    let webEvents = [];
    response.body.activeEvents.forEach((event)=>{
        webEvents.push(new WebEvent(event));
    });
    return webEvents;
}

class WebEvent {
    constructor(url){
        this.url = url;
    }
    async open(access_token){
        if(this.url.includes("GARENA_TOKEN")){
            let response = await needle("get", this.url.replace("freefiremobile.com/", "freefiremobile.com/api/info").replace("<GARENA_TOKEN>", access_token).replace("<FF_LANGUAGE>", "pt-br").replace("FF_REGION", "BR"));
            if(response.statusCode == 200){
                return response.body;
            }else if(response.statusCode == 403){
                throw new ForbiddenError();
            }else{
                throw new NotFoundError();
            }
        }else{
            let response = await needle("get", this.url+`api/info?access_token=${access_token}&lang=pt-br&region=BR`);
            if(response.statusCode == 200){
                return response.body;
            }else if(response.statusCode == 403){
                throw new ForbiddenError();
            }else{
                throw new NotFoundError();
            }
        }
        
    }
    async images(){
        if(this.url.includes("GARENA_TOKEN")){
            let response = await needle("get", this.url.replace("freefiremobile.com/", "freefiremobile.com/api/css").replace("<FF_LANGUAGE>", "pt-br").replace("FF_REGION", "BR"));
            if(response.statusCode == 200){
               let bruteUrls = response.body.toString().split("https://");
               let images = [];
               bruteUrls.forEach((bruteUrl)=>{
                   images.push(cortarString(bruteUrl));
               });
               images.shift();
               return images;
            }else if(response.statusCode == 403){
                throw new ForbiddenError();
            }else{
                throw new NotFoundError();
            }
        }else{
            let response = await needle("get", this.url+`api/css?lang=pt-br&region=BR`);
            if(response.statusCode == 200){
               let bruteUrls = response.body.toString().split("https://");
               let images = [];
               bruteUrls.forEach((bruteUrl)=>{
                   images.push(cortarString(bruteUrl));
               });
               images.shift();
               return images;
            }else if(response.statusCode == 403){
                throw new ForbiddenError();
            }else{
                throw new NotFoundError();
            }
        }
    }
}

function cortarString(url) {
    var posicaoPNG = url.indexOf(".png");
    var posicaoJPG = url.indexOf(".jpg");
    var posicaoExtensao = Math.max(posicaoPNG, posicaoJPG);
    let format = ".png";
    if(url.includes(".jpg")){
        format = ".jpg"
    }
  
    return "https://"+url.substring(0, posicaoExtensao)+format;
}

module.exports = {
    getActiveWebEvents,
    WebEvent
}