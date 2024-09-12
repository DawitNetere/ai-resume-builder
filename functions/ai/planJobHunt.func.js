const functions = require("firebase-functions");
const {cors} = require("../utils/cors");
const {openai} = require("../utils/openai");

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res);

  try {
    const industryBranch = req.body.industryBranch;
    const position = req.body.position;

    const planResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `I'm looking for a job hunt plan related to ${industryBranch} for this position: ${position}. Can you recommend some plans? Please provide a concise action plan, including resume updates, networking strategies, and interview preparation tips. Return the information for up to 5 items. Return text in Markdown or HTML syntax without a block code, places to insert data, or any additional commentary and explanations. All links should open in a new tab, so you can use HTML syntax for this particular case.`,
        },
      ],
    });

    res.status(200).send({
      jobHuntPlan: planResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error planning a job hunt");
  }
});
