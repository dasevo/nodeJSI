const url = require("url");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let msgs = new Array();

exports.apiChat = function(req, res) {
    let q = url.parse(req.url, true);
    let d = new Date();

    if(q.pathname==="/chat/listmsgs") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    } else if(q.pathname==="/chat/addmsg") {

        let data = "";
        req.on('data', function (chunk) {
            try {
                data += chunk;
            } catch (e) {
                console.error(e);
            }
        })
        req.on('end', function () {
            if (data) {
                let body = JSON.parse(data);


                res.writeHead(200, {
                    "Content-type": "application/json"
                });
                let obj = {};
                obj.text = entities.encode(body.msg);
                obj.time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                obj.date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
                obj.user = body.usr;
                msgs.push(obj);
                res.end(JSON.stringify(obj));
            }
        });
    }
}