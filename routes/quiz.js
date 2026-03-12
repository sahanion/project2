const express = require("express");
const router = express.Router();

const { generateQuestions } = require("../services/openaiService");

router.get("/questions", async (req, res) => {

const topic = req.query.topic;

try {

const questions = await generateQuestions(topic);

res.json(questions);

} catch (error) {

console.error(error);

res.status(500).json({ error: "Failed to generate questions" });

}

});

module.exports = router;