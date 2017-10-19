const express = require("express");
const multer = require("multer");
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
const { test } = require("./nlp/file_handler");
const storage = multer.diskStorage({
  destination: "./dal/temp",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());

// ============================================
// Routes
//============================================

app.post("/case/files/new", upload.single("file"), (req, res) => {
  const document = req.file;
  const fileLocation = __dirname + "/" + document.path;
  console.log("This is a document? ", document);
  test(document, fileLocation);
  if (document) res.send(true);
  if (!document) res.send(false);
});

// ============================================
// Server set up
//============================================

app.set("port", 4000);

app.listen(app.get("port"), () => {
  console.log("Your app has started, sir.");
});

module.exports = app;
