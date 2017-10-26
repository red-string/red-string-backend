const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");
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

function getPDFtext(fileObject, fileLocation) {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser(this, 1);

    pdfParser.on("pdfParser_dataError", errData =>
      console.error(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", pdfData => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });
    pdfParser.loadPDF(fileLocation);
  });
}
//
// //modules for Python shell NLP API processing
// const PythonShell = require('python-shell');
// const options = {mode: "text", pythonPath: "/usr/bin/python"}
// const pyshell = new PythonShell('pypractice.py', options);

//function to get tags from uploaded text file
async function LOL(fileObject, fileLocation, fileType) {
  let text;
  if (fileType === "docx") {
    text = getDocXText(fileObject, fileLocation);
  } else if (fileType === "pdf") {
    text = await getPDFtext(fileObject, fileLocation);
  } else if (fileType === "input") {
    console.log(fileObject);
    text = fileObject.file_text;
  }
  const nlpArr = await nlptk(text);
  const regExArr = await returnRegExObjs(text);
  const fileTagsArr = regExArr.concat(nlpArr);
  return fileTagsArr;
}

module.exports = { LOL };
