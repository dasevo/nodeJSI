const http = require("http");
const dateFormat = require("dateformat");

const DNY_V_TYDNU = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];

let citac = 0;

http.createServer((req, res) => {
    if (req.url === "/") {
        citac++;
    }
    if (req.url === "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> jina strana</body></html>");
    } else if (req.url === "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Vojtech";
        obj.prijmeni = "Dasek";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));
    } else if (req.url === "/denvtydnu") {
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin":"*"
        });
        let d = new Date()
        let obj = {}
        obj.datum = d;
        obj.cisloDne = d.getDay(); // nedele = 0
        obj.datumCesky = d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear(); // leden = 0
        obj.formatovano = dateFormat(d, "dd.mm.yy");
        obj.casCesky = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        obj.denVTydnu = DNY_V_TYDNU[obj.cisloDne];
        obj.casUTC = d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
        res.end(JSON.stringify(obj));
    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> pocet volání: " + citac + "</body></html>");
    }
}).listen(2000);