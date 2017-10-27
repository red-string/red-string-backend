const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const {
  getMultipleFiles,
  getFilesThatShareTag,
  getAllTagsThatShareFile,
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
  createCase,
  deleteFile
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

app.get("/case", async (req, res) => {
  let cases = await getAllCases();
  if (cases) res.send(cases);
  if (!cases) res.send(false);
});

app.get("/case/:id", async (req, res) => {
  let files = await getAllFilesFromCase(req.params.id);
  if (req.params) res.send(files);
  if (!req.params) res.send(false);
});

app.get("/file/:id", async (req, res) => {
  let file_id = req.params.id;
  let file = await getFileById(file_id);
  if (req.params) res.send(file);
  if (!req.params) res.send(false);
});

//by file id
app.get("/case/:case/:id", async (req, res) => {
  console.log(req.params);
  const caseId = req.params.case;
  const fileId = req.params.id;
  const tags = await getAllTagsThatShareFile(fileId);
  const fileInfo = {
    name: tags[0].file_name,
    d3: tags[0].file_d3,
    desciption: tags[0].file_description,
    children: []
  };
  tags.forEach((tag, ind) => {
    const tagInfo = {
      name: tag.tag,
      d3: tag.tag_d3,
      desciption: "",
      parent: fileInfo.d3
    };
    fileInfo.children[ind] = tagInfo;
  });
  console.log(fileInfo);
  if (req.params) res.send(fileInfo);
  if (!req.params) res.send(false);
});

//by tag id
app.get("/:case/files/tags/:id", async (req, res) => {
  const tagName = await getTagById(req.params.id);
  console.log(tagName);
  const filesArray = await getFilesThatShareTag(
    req.params.case,
    tagName[0].tag
  );
  console.log(filesArray);
  const returnData = {
    name: filesArray.tag,
    d3: "t" + req.params.id,
    description: "",
    children: []
  };
  filesArray.forEach((file, ind) => {
    const fileData = {
      name: file.file_name,
      d3: file.file_d3,
      description: file.file_description,
      parent: "t" + req.params.id
    };
    returnData.children[ind] = fileData;
  });
  console.log(returnData);
  if (req.params) res.send(returnData);
  if (!req.params) res.send(false);
});

//all tags from case
app.get("/:case/files/tags", async (req, res) => {
  console.log(req.params);
  let tags = await getAllTagsFromCase(req.params.case);
  if (req.params) res.send(tags);
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

app.post("/case/:case/new", upload.single("file"), async (req, res) => {
  console.log("request body", req.body);
  const document = req.file;
  const thisCase = req.params.case;
  const docType = req.body.file_type;
  const fileLocation = __dirname + "/" + document.path;
  let fileObject = {};
  if (req.body.file_text !== "") {
    fileObject.file_name = req.body.name;
    fileObject.file_description = req.body.description;
    fileObject.case_id = thisCase;
    fileObject.file_text = req.body.file_text;
  } else {
    fileObject.file_name = req.body.name;
    fileObject.file_description = req.body.description;
    fileObject.case_id = thisCase;
  }

  const fileId = await createFile(fileObject);
  const tags = await LOL(document, fileLocation, docType);
  createTags(tags, fileId.id, thisCase).then(deleteFile(fileLocation));

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
