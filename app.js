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

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// ============================================
// Routes
//============================================

app.post("/case/file/new", (req, res) => {
  if (success) res.send(true);
  if (err) res.send(false);
});

// ============================================
// Server set up
//============================================

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Your app has started, sir.", process.env.Port);
});

module.exports = app;
