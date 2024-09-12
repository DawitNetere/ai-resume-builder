const OpenAI = require("openai");
require("dotenv").config();

// Set OpenAI API key
const openaiApiKey = process.env.OPEN_AI_API_KEY;

const openai = new OpenAI({apiKey: openaiApiKey});

module.exports = {openai};
