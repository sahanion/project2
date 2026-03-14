const express = require("express");
const router = express.Router();
const auth = require("basic-auth");

const fs = require("fs");
const path = require("path");

function checkAuth(req, res, next){

const user = auth(req);

const ADMIN_USER = "admin";
const ADMIN_PASS = "abcd1234";

if(!user || user.name !== ADMIN_USER || user.pass !== ADMIN_PASS){

res.set("WWW-Authenticate",'Basic realm="Admin Panel"');

return res.status(401).send("Authentication required");

}

next();

}

router.get("/analytics", checkAuth, (req,res)=>{

const filePath = path.join(__dirname,"../logs/results.json");

const data = JSON.parse(fs.readFileSync(filePath));

res.json(data);

});

module.exports = router;