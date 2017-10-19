const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const { returnRegExTags, returnTagObjs } = require("./regex");
//general node and document processing modules

const _ = require("lodash");

//preparing document text for language processing
// const zip = new JSZip();
// let doc = new Docxtemplater().loadZip();
// const text = doc.getFullText();

function getDocXText(fileObject, fileLocation) {
  const document = fileLocation;
  const readFile = fs.readFileSync(document);
  const zip = new JSZip(readFile);
  const doc = new Docxtemplater().loadZip(zip);
  const text = doc.getFullText();
  return text;
}

function LOL(fileObject, fileLocation) {
  const text = getDocXText(fileObject, fileLocation);
  console.log(text);
}

module.exports = { LOL };
