const http = require("http");

let citac = 1;

http.createServer((req, res) => {
    if (req.url == "/") {
        citac++;
    }
    if (req.url == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> jina strana</body></html>");
    } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> pocet volání: " + citac + "</body></html>");
    }
}).listen(2000);