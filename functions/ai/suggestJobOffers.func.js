const functions = require("firebase-functions");
const _busboy = require("busboy");
const pdf = require("pdf-parse");
const {cors} = require("../utils/cors");
const {openai} = require("../utils/openai");

module.exports = functions.https.onRequest((req, res) => {
  cors(req, res);

  const busboy = _busboy({headers: req.headers});
  const fields = {};
  const files = [];

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const fileBuffer = [];
    file.on("data", (data) => {
      fileBuffer.push(data);
    });
    file.on("end", () => {
      files.push({
        fieldname,
        filename,
        encoding,
        mimetype,
        buffer: Buffer.concat(fileBuffer),
      });
    });
  });

  busboy.on("field", (fieldname, value) => {
    fields[fieldname] = value;
  });

  busboy.on("finish", async () => {
    try {
      const resumeData = await pdf(files[0].buffer);
      const resumeText = resumeData.text;
      const location = fields.location || "Worldwide";

      const grammarResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `I'm looking for job offers that best match my resume, in this location: ${location}. Can you suggest some job offers in this area? Please provide the name of the position, the company, a brief description of the offer and also a link if available. Return the information for up to 5 offers. If you don't have access to real-time data, suggest the offers you know about and consider only companies that recruit frequently. Return text in Markdown or HTML syntax without a block code, places to insert data, or any additional commentary and explanations. All links should open in a new tab, so you can use HTML syntax for this particular case. Resume: ${resumeText}`,
          },
        ],
      });

      res.status(200).send({
        jobOffers: grammarResponse.choices[0].message.content,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error suggesting job offers");
    }
  });

  busboy.end(req.rawBody);
});
