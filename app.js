const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
  getMultipleFiles,
  getFilesThatShareTag,
  getTagById,
  getFileById,
  getCaseById,
  getLastTagId,
  getLastFileId,
  getLastCaseId,
  getAllTagsFromCase,
  getAllTagsFromFile,
  getAllFilesFromCase,
  getAllCases,
  createTags,
  createFile,
  createCase
} = require("./dal");

app.use(bodyParser.json());

// ============================================
// Routes
//============================================

app.post("/case/files/new", (req, res) => {
  const document = req.body;
  console.log(document);
  if (document) res.send(true);
  if (!document) res.send(false);
});

// ============================================
// Server set up
//============================================

app.set("port", 4000);

app.listen(app.get("port"), () => {
  console.log("Your app has started, sir.", process.env.Port);
});

module.exports = app;
