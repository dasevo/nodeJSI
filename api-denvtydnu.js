const DNY_V_TYDNU = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
const dateFormat = require("dateformat");

exports.apiDenVTydnu = function (req, res) {
    res.writeHead(200, {
        "Content-type": "application/json",
    });
    let d = new Date();
    let obj = {};
    obj.datum = d;
    obj.cisloDne = d.getDay(); // nedele = 0
    obj.datumCesky = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear(); // leden = 0
    obj.formatovano = dateFormat(d, "dd.mm.yy");
    obj.casCesky = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    obj.denVTydnu = DNY_V_TYDNU[obj.cisloDne];
    obj.casUTC = d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
    res.end(JSON.stringify(obj));
}