//general node and document processing modules
const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
let content = fs.readFileSync(__dirname + "/syntax_paper_final.docx", "binary");
const _ = require('lodash')
const dict = require('check-word')
const wordlist = dict('en')
const compromise = require('compromise')

//natural language processing modules and globals
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const pos = require('pos');


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
  let properNounCount = _.countBy(getActualProperNouns())
  console.log(properNounCount);
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
  frequentNounArr = _.takeRight(nounFrequencyArr, [n=15]);
}

function getActualProperNouns () {
  let rawNounsArr = getProperNounArr();
  let tagsArr = [];
  rawNounsArr.forEach(function (item) {
    // item = _.toLower(item)
    if (wordlist.check(_.toLower(item)) === false) {
      tagsArr.push(item)
    }
  }
)
  console.log('proper nouns got!')
  return tagsArr;
}

console.log(getProperNounArr());
//
// var t=compromise(text).people();
// console.log(t.out('text'))
// // 'dinosaurs'
