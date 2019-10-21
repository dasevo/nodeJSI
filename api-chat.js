const url = require("url");

let msgs = new Array();

exports.apiChat = function(req, res) {
    let q = url.parse(req.url, true);
    let d = new Date();

    if(q.pathname==="/chat/listmsgs") {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    } else if(q.pathname==="/chat/addmsg") {
        res.writeHead(200, {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        });
        let obj = {};
        obj.text = q.query["msg"];
        obj.time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        obj.date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
        obj.user = q.query["user"];
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
}