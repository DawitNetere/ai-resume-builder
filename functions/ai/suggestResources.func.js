const functions = require("firebase-functions");
const {cors} = require("../utils/cors");
const {openai} = require("../utils/openai");

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res);

  try {
    const industryBranch = req.body.industryBranch;
    const description = req.body.description;

    const resourcesResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `I'm looking for resources suggestions related to ${industryBranch} about ${description}. Can you recommend some resources? Please provide the name of the resource, a brief description and also a link if available. Return the information for up to 5 resources. If you don't have access to real-time data, suggest the most popular resources you know about which match the requirements. Return text in Markdown or HTML syntax without a block code, places to insert data, or any additional commentary and explanations. All links should open in a new tab, so you can use HTML syntax for this particular case.`,
        },
      ],
    });

    res.status(200).send({
      resources: resourcesResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error suggesting resources");
  }
});
