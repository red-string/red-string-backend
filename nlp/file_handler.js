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
  console.log("This is docx text", text);
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
async function fileHandler(fileObject, fileLocation, fileType) {
  let text;
  console.log("This is the file handler", fileObject);
  if (fileType === "docx") {
    text = getDocXText(fileObject, fileLocation);
    console.log("This is docx text", text);
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
