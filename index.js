const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {"Content-type": "text/html"});
    res.end("<html lang='cs'><head><meta charset='UTF-8'></head><body>č</body></html>");
}).listen(2000);