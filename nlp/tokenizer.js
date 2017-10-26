const testArr = ["a", "b", "a", "b", "c", "a", "d", "r", "c", "c", "s", "u"]
const _ = require("lodash");
const { returnTagObjs } = require("./regex");
const tagEndFilter = /\/\w{2,3}\)?/gi;
const tagBeginFilter = /\(\w*/gi;

function cleanTagArr(arr) {
  let filteredArr = [];
  let cleanedStr = "";

  arr.forEach(function(item) {
    cleanedStr = item.replace(tagEndFilter, "");
    cleanedStr = cleanedStr.replace(tagBeginFilter, "");
    cleanedStr = _.trim(cleanedStr);
    filteredArr.push(cleanedStr);
  });
  return filteredArr;
}

function getUniqueTags(arr) {
  let tagsArr = cleanTagArr(arr);
  let uniqueTagsArr = _.uniq(tagsArr);
  return returnTagObjs(uniqueTagsArr);
}

function getTagFrequencyArr (arr) {
  const tagTotal = arr.length;
  let tagTally = _.countBy(arr);
  // let tagFreqObj = {};
  let tagFrequencyArr = [];
  for (key in tagTally) {
    tagFrequencyArr.push({
      tag: key,
      frequency: tagTally[key]
    })
  }
  return tagFrequencyArr;
}

function getTagFreq (tag, arr) {
  let allFreqs = getTagFrequencyArr(arr);
  let tagFreq = _.find(allFreqs, {'tag': tag})
  return tagFreq.frequency;
}



module.exports = { getUniqueTags };

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
