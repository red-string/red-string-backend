const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { returnRegExTags, returnRegExObjs, returnTagObjs } = require("./regex");
// const { pyNLP, endPynlp } = require("./pypractice");
const { maxSizeFileHandler, nlptk } = require("./helper");

const _ = require("lodash");

//preparing document text for language processing
function getDocXText(fileObject, fileLocation) {
  const document = fileLocation;
  const readFile = fs.readFileSync(document);
  const zip = new JSZip(readFile);
  const doc = new Docxtemplater().loadZip(zip);
  const text = doc.getFullText();
  return text;
}
//
// //modules for Python shell NLP API processing
// const PythonShell = require('python-shell');
// const options = {mode: "text", pythonPath: "/usr/bin/python"}
// const pyshell = new PythonShell('pypractice.py', options);

//function to get tags from uploaded text file
function LOL(fileObject, fileLocation) {
  const text = getDocXText(fileObject, fileLocation);
  console.log("reg ex?", returnRegExObjs(text));
  nlptk(text);
}

module.exports = { LOL };
