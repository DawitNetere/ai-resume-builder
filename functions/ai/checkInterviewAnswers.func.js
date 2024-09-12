const functions = require("firebase-functions");
const {cors} = require("../utils/cors");
const {openai} = require("../utils/openai");

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res);

  try {
    const industryBranch = req.body.industryBranch;
    const position = req.body.position;
    const questionsAndAnswers = req.body.questionsAndAnswers;

    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `I'm looking for interview summary related to ${industryBranch} for this position: ${position}. Can you check if my answers to the questions are correct? Return the description of every question's answer and also a general summary at the end. Return text in Markdown or HTML syntax without a block code, places to insert data, or any additional commentary and explanations. All links should open in a new tab, so you can use HTML syntax for this particular case. Questions and answers: ${questionsAndAnswers?.map((qa, index) => `Question ${index + 1}: ${qa.question} Answer ${index + 1}: ${qa.answer}`).join(";")}`,
        },
      ],
    });

    res.status(200).send({
      summary: summaryResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting interview summary");
  }
});
