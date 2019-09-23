const http = require("http");

let citac = 0;

http.createServer((req, res) => {
    if (req.url == "/") {
        citac++;
    }
    if (req.url == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> jina strana</body></html>");
    } else if (req.url == "/jsondemo") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Vojtech";
        obj.prijmeni = "Dasek";
        obj.rokNarozeni = 2002;
        res.end(JSON.stringify(obj));
    } else if (req.url == "/jsoncitac") {
        citac++;
        let num = {}
        num.citac = citac;
        res.end(JSON.stringify(num));
    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> pocet volání: " + citac + "</body></html>");
    }
}).listen(2000);