const crypto = require("crypto");

let pass = "password";

function encode(pass) {
    //let toEncode = crypto.createHash("md5").update(pass).digest("hex");
    //toEncode = crypto.createHash("md5").update(toEncode).digest("hex");
    let salt = pass.split("").reverse().join("");
    let toEncode = crypto.createHmac("sha256", salt).update(pass).digest("hex");
    return toEncode;
}

console.log(encode(pass));