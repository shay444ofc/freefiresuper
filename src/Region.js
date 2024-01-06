function getLangByRegion(region){
    let langs = {
        "BR":"pt-BR",
        "LATAM":"es-419",
        "IND":"en-US",
        "ID":["ban", "id"],
        "PK":"en-US",
        "SG":"en-US",
        "TW":"zh-TW",
        "ME":"ar-EG",
        "TH":"en-US",
        "RU":"ru-RU"
    return langs[region];
}

function dateFormat(date, region){
    let lang = getLangByRegion(region);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let dateForm = new Intl.DateTimeFormat(lang, {
        dateStyle:"full",
        timeStyle:"long",
        timeZone: timeZone
    });
    return dateForm.format(date);
}


module.exports = {
    getLangByRegion,
    dateFormat
}