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
          content: `I'm looking for job interview feedback in ${industryBranch} field specifically in the position of : ${position}. Could you provide feedback on each question's clarity, relevance, and effectiveness for gauging my knowledge? Additionally, suggest me any improvements for making the questions more comprehensive or realistic for a tech interview setting. Return the description of every question's answer followed by suggested correct answer and also your general feedback at the end. Return text in Markdown or HTML syntax without a block code, places to insert data, or any additional commentary and explanations. All links should open in a new tab, so you can use HTML syntax for this particular case. Questions and answers: ${questionsAndAnswers?.map((qa, index) => `Question ${index + 1}: ${qa.question} Answer ${index + 1}: ${qa.answer}`).join(";")}`,
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
