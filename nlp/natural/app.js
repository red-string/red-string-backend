//general node and document processing modules
const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
let content = fs.readFileSync(__dirname + "/texts/chuck_connors.docx", "binary");
const _ = require('lodash')

//natural language processing modules and globals
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const pos = require('pos');
//stands for Term Frequency-Inverse Document Frequency
const TfIdf = natural.TfIdf
const tfidf = new TfIdf();


//preparing document text for language processing
const zip = new JSZip(content);
let doc = new Docxtemplater().loadZip(zip);
const text = doc.getFullText();

//creating raw array of all POS-tagged words from a document.
let taggedArr = [];
let words = new pos.Lexer().lex(text);
let taggedWords = new pos.Tagger().tag(words);
for (i in taggedWords) {
    let taggedWord = taggedWords[i];
    let word = taggedWord[0];
    let tag = taggedWord[1];
    let wordObj = {"word": word, "tag": tag};
    taggedArr.push(wordObj);
}

//creating array of proper nouns from raw array
let properNounArr = [];
function getProperNounArr () {
  taggedArr.forEach(function (item) {
  if ((item.tag === 'NNP') || (item.tag === 'NNPS')) {
    properNounArr.push(item.word);
    }
  }
  )
  return properNounArr
}

//iterating over proper noun array to get array of unique nouns
function getUniqueProperNouns () {
  let uniqueProperNounArr = _.uniq(getProperNounArr());
  return uniqueProperNounArr;
}

//create array of objects containing proper nouns and their frequency in the document
function getProperNounFrequency () {
  let properNounCount = _.countBy(getProperNounArr())
  let properNounObj = {};
  let properNounCountArr = [];
  for (key in properNounCount) {
    properNounCountArr.push({
      word: key,
      count: properNounCount[key]
    })
  }
  let nounFrequencyArr = _.sortBy(properNounCountArr, ['count'])
  return nounFrequencyArr;
}
// console.log(getProperNounArr());
// getUniqueProperNouns();
function getFrequentNouns () {
  let frequentNounArr = [];
  let nounFrequencyArr = getProperNounFrequency();
  frequentNounArr = _.takeRight(nounFrequencyArr, [n=5]);
  console.log(frequentNounArr)
}

getFrequentNouns();
