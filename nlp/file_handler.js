const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const PDFParser = require("pdf2json");
const { returnRegExTags, returnRegExObjs, returnTagObjs } = require("./regex");
const { nlptk } = require("./nlptk");

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

//function to get tags from uploaded text file
<<<<<<< HEAD
async function LOL(fileObject, fileLocation, fileType) {
  console.log('it works in the lol', fileObject, fileLocation, fileType)
  let text;
  if (fileType === "docx") {
    text = getDocXText(fileObject, fileLocation);
=======
async function fileHandler(fileObject, fileLocation, fileType) {
  let text;
  if (fileType === "docx") {
    text = getDocXText(fileObject, fileLocation);
    console.log(text);
>>>>>>> d289eeee5d8652d6dedd8d44553057047d71851d
  } else if (fileType === "pdf") {
    text = await getPDFtext(fileObject, fileLocation);
  } else if (fileType === "input") {
    text = fileObject;
  }
  const nlpArr = await nlptk(text);
  const regExArr = await returnRegExObjs(text);
  const fileTagsArr = regExArr.concat(nlpArr);
  return fileTagsArr;
}

module.exports = { fileHandler };
