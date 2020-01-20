const url = require("url");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

let msgs = new Array();

exports.apiChat = function(req, res) {
    let d = new Date();

    if(req.pathname==="/chat/listmsgs") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    } else if(req.pathname==="/chat/addmsg") {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        obj.text = entities.encode(req.parameters.msg);
        obj.time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        obj.date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
        obj.user = req.parameters.usr;
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
}