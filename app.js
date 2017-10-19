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
const { LOL } = require("./nlp/file_handler");
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

// ===========
// Gets
//============

//by case id
app.get("/case/:id", (req, res) => {
  console.log(req.params);
  if (req.params) res.send(true);
  if (!req.params) res.send(false);
});

//by file id
app.get("/case/:case/:id", (req, res) => {
  console.log(req.params);
  const caseId = req.params.case;
  if (req.params) res.send(true);
  if (!req.params) res.send(false);
});

//by tag id
app.get("/case/files/tags/:id", (req, res) => {
  console.log(req.params);
  if (req.params) res.send(true);
  if (!req.params) res.send(false);
});

// ===========
// Posts
//============

app.post("/case/new", (req, res) => {
  console.log(req.body);
  const newCase = createCase(req.body);
  if (newCase) res.send(true);
  if (!newCase) res.send(false);
});

app.post("/case/:case/new", upload.single("file"), (req, res) => {
  const document = req.file;
  const fileLocation = __dirname + "/" + document.path;
  console.log("This is a document? ", document);
  LOL(document, fileLocation);
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
