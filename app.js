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
const { fileHandler } = require("./nlp/file_handler");
const storage = multer.diskStorage({
  destination: "./dal/temp",
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());

// ============================================
// Create Return Objects
//============================================

function returnTagObject(tags) {
  const fileInfo = {
    name: tags[0].file_name,
    d3: tags[0].file_d3,
    desciption: tags[0].file_description,
    children: []
  };
  tags.forEach((tag, ind) => {
    const tagInfo = {
      name: tag.tag,
      id: tag.tag_id,
      d3: tag.tag_d3,
      desciption: "",
      parent: fileInfo.d3
    };
    fileInfo.children[ind] = tagInfo;
  });
  return fileInfo;
}

function returnFileObject(filesArray, id) {
  const returnData = {
    name: filesArray.tag,
    d3: "t" + id,
    description: "",
    children: []
  };
  filesArray.forEach((file, ind) => {
    const fileData = {
      name: file.file_name,
      d3: file.file_d3,
      id: file.file_id,
      description: file.file_description,
      parent: "t" + id
    };
    returnData.children[ind] = fileData;
  });
  return returnData;
}

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

// returns parent FILE and child TAGS
app.get("/case/:case/:id", async (req, res) => {
  const caseId = req.params.case;
  const fileId = req.params.id;
  const tags = await getAllTagsThatShareFile(fileId);
  const fileInfo = returnTagObject(tags);
  if (req.params) res.send(fileInfo);
  if (!req.params) res.send(false);
});

//returns parent TAG and child FILES
app.get("/:case/files/tags/:id", async (req, res) => {
  const tagName = await getTagById(req.params.id);
  const filesArray = await getFilesThatShareTag(
    req.params.case,
    tagName[0].tag
  );
  const returnData = returnFileObject(filesArray, req.params.id);
  console.log("Return data", returnData);
  if (req.params) res.send(returnData);
  if (!req.params) res.send(false);
});

app.get("/:case/files/tags", async (req, res) => {
  let tags = await getAllTagsFromCase(req.params.case);
  if (req.params) res.send(tags);
  if (!req.params) res.send(false);
});

// ===========
// Posts
//============

//new case
app.post("/case/new", (req, res) => {
  const newCase = createCase(req.body);
  if (newCase) res.send(true);
  if (!newCase) res.send(false);
});

//new file and new tags
app.post("/case/:case/new", upload.single("file"), async (req, res) => {
  const document = req.file;
  const thisCase = req.params.case;
  let docType;
  let fileLocation;
  let fileObject = {};
  let newFile;
  if (req.body.file_text !== "") {
    newFile = req.body.file_text;
    docType = "input"
    fileObject.file_name = req.body.name;
    fileObject.file_description = req.body.description;
    fileObject.case_id = thisCase;
    fileObject.file_text = req.body.file_text;
  } else {
      newFile = document;
      docType = req.body.file_type;
      fileObject.file_name = req.body.name;
      fileObject.file_description = req.body.description;
      fileObject.case_id = thisCase;
      fileLocation = __dirname + "/" + document.path;
  }
  const fileId = await createFile(fileObject);
  console.log('this is the doctype being passed back to the lol function: ', docType)
  // const tags = await LOL(document, fileLocation, docType);
  const tags = await LOL(newFile, fileLocation, docType)
  if (document) {
    createTags(tags, fileId.id, thisCase).then(deleteFile(fileLocation))
  }
  else {createTags(tags, fileId.is, thisCase)}

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
