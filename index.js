const http = require("http");

let citac = 1;

http.createServer((req, res) => {
    if (req.url == "/") {
        citac++;
    }
    res.writeHead(200, {"Content-type": "text/html"});
    res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body> poet volání: " + citac + "</body></html>");
}).listen(2000);