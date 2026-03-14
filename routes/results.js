const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/submitResult", (req, res) => {

const filePath = path.join(__dirname, "../logs/results.json");

// read existing data
let results = JSON.parse(fs.readFileSync(filePath));

// create entry
const entry = {

ip: req.ip,

topic: req.body.topic,

attempted: req.body.attempted,

correct: req.body.correct,

wrong: req.body.wrong,

time: req.body.time,

timestamp: new Date().toISOString()

};

// add new entry
results.push(entry);

// save file
fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

res.json({ status: "saved" });

});

module.exports = router;