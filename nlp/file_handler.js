const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { returnRegExTags, returnTagObjs } = require("./regex");
const { pyNLP, endPynlp } = require("./pypractice");
const { maxSizeFileHandler } = require("./helper");

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
async function LOL(fileObject, fileLocation) {
  const text = getDocXText(fileObject, fileLocation);
  console.log(returnTagObjs(text));
  const textArray = maxSizeFileHandler(text);
  const tagsArray = [];
  let textArrayLength = textArray.length;
  let counter = 0;
  // console.log(pyNLP(text))
  // console.log("text is: ", typeof text);
  while (textArrayLength > 0) {
    console.log(counter);
    const tags = await pyNLP(textArray[counter]);
    tagsArray.push(tags);
    textArrayLength--;
    counter++;
  }
  endPynlp();
  console.log(tagsArray);
}

module.exports = { LOL };
