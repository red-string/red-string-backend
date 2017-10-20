const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { returnRegExTags, returnTagObjs } = require("./regex");
const { pyNLP } = require("./pypractice")

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
  let text = getDocXText(fileObject, fileLocation);
  console.log(returnTagObjs(text));
  // console.log(pyNLP(text))
  console.log("text is: ", typeof text);
  text = text.toString()
  pyNLP(text)

}

module.exports = { LOL };
