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

      const [grammarResponse, keywordsResponse] = await Promise.all([
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `I've extracted text from the PDF file, but it may be in the wrong order (e.g. some section headings may be behind the content rather than at the beginning). Please reorganize incorrectly placed section headings in the following resume text, but don't add any extra words. Correct any grammatical errors and stylistic issues. Return only the correct text in Markdown syntax without a block code or any additional commentary and explanations. Resume: ${resumeText}`,
            },
          ],
        }),
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `I've extracted text from the PDF file, but it may be in the wrong order (e.g. some section headings may be behind the content rather than at the beginning). Suggest relevant keywords (10 most relevant keywords) that should be included in this resume to enhance the relevance of the resume for a desired job role. Return only the keywords as a comma-separated list. For each keyword include a short description which will be separated by a semicolon (e.g. keyword1;description1,keyword2;description2). Don't add any additional commentary or explanations. Resume: ${resumeText}`,
            },
          ],
        }),
      ]);

      res.status(200).send({
        grammar: grammarResponse.choices[0].message.content,
        keywords: keywordsResponse.choices[0].message.content,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error checking grammar and style");
    }
  });

  busboy.end(req.rawBody);
});
