const functions = require("firebase-functions");
const {cors} = require("../utils/cors");
const {openai} = require("../utils/openai");

module.exports = functions.https.onRequest(async (req, res) => {
  cors(req, res);

  try {
    const location = req.body.location;
    const industryBranch = req.body.industryBranch;

    const networkingEventsResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `I'm looking for networking events in ${location} related to ${industryBranch} that are happening in the coming months of 2024. Can you suggest some networking events in this area? Please provide the name of the event, the date, a brief description of the event and also a link if available. Return the information for up to 5 events. If you don't have access to real-time data, suggest the events you know about and are organized periodically. Return text in Markdown or HTML syntax without a block code, places to insert data, or any additional commentary and explanations. All links should open in a new tab, so you can use HTML syntax for this particular case.`,
        },
      ],
    });

    res.status(200).send({
      networkingEvents: networkingEventsResponse.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error suggesting networking events");
  }
});
