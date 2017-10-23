const _ = require('lodash');
const {returnTagObjs} = require('./regex')

let testArr = [ '(S',
  '(PERSON Tom/NNP Sawyer/NNP)',
  '(PERSON Mr./NNP Mark/NNP Twain/NNP)',
  '(PERSON Aunt/NNP Polly/NNP)',

  '(PERSON Aunt/NNP Polly/NNP)',
  '(PERSON Tom/NNP)',
  '(ORGANIZATION Aunt/NNP Polly/NNP)',
  '(ORGANIZATION Widow/NNP Douglas/NNP)',
  '(PERSON Tom/NN)',
  '(ORGANIZATION Widow/NNP)',
  '(PERSON Tom/NNP Sawyer/NNP)',
  '(PERSON Moses/NNS)',
  '(GPE Moses/NNP)',
  '(PERSON Miss/NNP Watson/NNP)',
  '(PERSON Miss/NNP Watson/NNP)',
  '(GPE Huckleberry/NNP)',
  '(PERSON Huckleberry/NNP)',
  '(PERSON Huckleberry/NNP)',
  '(PERSON Iwas/NNP)',
  '(PERSON Tom/NNP Sawyer/NNP)',
  '(PERSON Imost/NNP)' ]

let cleanedStr = ""
let filteredArr = []
const tagEndFilter = /\/NN.?\)?/gi;
const tagBeginFilter = /\(\w*/gi;

function cleanTagArr (arr) {
  arr.forEach(function (item) {
    cleanedStr = item.replace(tagEndFilter, "")
    cleanedStr = cleanedStr.replace(tagBeginFilter, "");
    cleanedStr = _.trim(cleanedStr);
    filteredArr.push(cleanedStr);
  })
  return filteredArr;
}

function getUniqueTags (arr) {
  let tagsArr = cleanTagArr(arr)
  let uniqueTagsArr = _.uniq(tagsArr);
  console.log('unique tags arr', uniqueTagsArr)
  returnTagObjs(uniqueTagsArr);
}

// function

// console.log("woo!", cleanTagArr(testArr))

module.exports = {getUniqueTags}
//
// //creating raw array of all POS-tagged words from a document.
// let taggedArr = [];
//
// for (i in taggedWords) {
//     let taggedWord = taggedWords[i];
//     let word = taggedWord[0];
//     let tag = taggedWord[1];
//     let wordObj = {"word": word, "tag": tag};
//     taggedArr.push(wordObj);
// }
//
// //creating array of proper nouns from raw array
// let properNounArr = [];
// function getProperNounArr () {
//   taggedArr.forEach(function (item) {
//   if ((item.tag === 'NNP') || (item.tag === 'NNPS')) {
//     properNounArr.push(item.word);
//     }
//   }
//   )
//   return properNounArr
// }
//
//iterating over proper noun array to get array of unique nouns

//
// //create array of objects containing proper nouns and their frequency in the document
// function getProperNounFrequency () {
//   let properNounCount = _.countBy(getActualProperNouns())
//   console.log(properNounCount);
//   let properNounObj = {};
//   let properNounCountArr = [];
//   for (key in properNounCount) {
//     properNounCountArr.push({
//       word: key,
//       count: properNounCount[key]
//     })
//   }
//   let nounFrequencyArr = _.sortBy(properNounCountArr, ['count'])
//   return nounFrequencyArr;
// }
// // console.log(getProperNounArr());
// // getUniqueProperNouns();
// function getFrequentNouns () {
//   let frequentNounArr = [];
//   let nounFrequencyArr = getProperNounFrequency();
//   frequentNounArr = _.takeRight(nounFrequencyArr, [n=15]);
// }
//
// function getActualProperNouns () {
//   let rawNounsArr = getProperNounArr();
//   let tagsArr = [];
//   rawNounsArr.forEach(function (item) {
//     // item = _.toLower(item)
//     if (wordlist.check(_.toLower(item)) === false) {
//       tagsArr.push(item)
//     }
//   }
// )
//   console.log('proper nouns got!')
//   return tagsArr;
// }
//
// console.log(getProperNounArr());
// //
// // var t=compromise(text).people();
// // console.log(t.out('text'))
// // // 'dinosaurs'
