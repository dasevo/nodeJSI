const url = require("url");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require("fs");
const crypto = require("crypto");

let users = new Array();
if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
}

function encode(pass) {
    //let toEncode = crypto.createHash("md5").update(pass).digest("hex");
    //toEncode = crypto.createHash("md5").update(toEncode).digest("hex");
    let toEncode = pass;
    for(let i = 0; i < 3; i++) {
        let salt = pass.split("").reverse().join("");
        toEncode = crypto.createHmac("sha256", salt).update(pass).digest("hex");
    }
    return toEncode;
}

exports.apiUser = function(req, res) {
    let d = new Date();

    if(req.pathname==="/user/listusers") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    } else if(req.pathname==="/user/adduser") {

        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        let userExists = false;
        obj.user = req.parameters.login;
        for(let u of users) {
            if(u.user === obj.user) {
                userExists = true;
                break;
            }
        }
        if(userExists) {
            obj.error = "user exists";
        } else {
            obj.time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            obj.date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
            obj.pass = encode(req.parameters.pass);
            obj.name = req.parameters.name;
            obj.email = req.parameters.email;

            users.push(obj);
            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        }
        res.end(JSON.stringify(obj));
    } else if(req.pathname === "/user/checkuser") {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let response = {};
        for (let i = 0; i < users.length; i++) {
            if (users[i].user === req.parameters.login && users[i].pass === encode(req.parameters.pass)) {
                response.response = true;
                response.error = "";
            }
            else if(users[i].user === req.parameters.login && !(users[i].pass === encode(req.parameters.pass))) {
                response.error = "hesla se neshoduji";
            }
            else {
                response.error = "uzivatel neexistuje";
            }
        }
        res.end(JSON.stringify(response));
    }
}