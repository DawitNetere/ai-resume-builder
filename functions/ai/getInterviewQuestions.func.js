const functions = require("firebase-functions");
const {cors} = require("../utils/cors");
const {openai} = require("../utils/openai");

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res);

  try {
    const industryBranch = req.body.industryBranch;
    const position = req.body.position;

    const questionsResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `I'm looking for interview questions related to ${industryBranch} for this position: ${position}. Can you give me some questions? Return the information for up to 5 items. Return only the questions as a semicolon-separated list. Make sure you didn't add the semicolon characters in the questions. Don't add any additional commentary or explanations.`,
        },
      ],
    });

    res.status(200).send({
      interviewQuestions: questionsResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting interview questions");
  }
});
