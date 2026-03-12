const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateQuestions(topic){

const prompt = `
You are a UPSC exam question generator.

Generate 5 difficult UPSC Prelims level MCQ questions from the topic: ${topic}.

Rules:
- Each question must have exactly 4 options.
- Only one option must be correct.
- Provide a short explanation.
- Questions should be analytical and UPSC standard.

Return ONLY valid JSON in this exact format:

[
{
"question": "Question text",
"options": [
"Option A",
"Option B",
"Option C",
"Option D"
],
"answer": "Correct option text",
"explanation": "Explanation text"
}
]

Do NOT include any extra text.
`;

const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt
});

const text = response.output_text;

return JSON.parse(text);

}

module.exports = { generateQuestions };