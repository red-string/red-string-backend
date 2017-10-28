// const testArr = ["a", "b", "a", "b", "c", "a", "d", "r", "c", "c", "s", "u"]
const _ = require("lodash");
const { returnTagObjs } = require("./regex");
const tagEndFilter = /\/\w{2,3}\)?/gi;
const tagBeginFilter = /\(\w*/gi;

//filtering out NLTK tags to return only lexical items
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

//getting frequency counts of tags and returning an array of unique tags and their frequencies
function getUniqueTags(arr) {
  let tagsArr = cleanTagArr(arr);
  let freqArr = getTagFrequencyArr(tagsArr);
  return freqArr;
}

//get an array of all tags and their frequencies
function getTagFrequencyArr(arr) {
  const tagTotal = arr.length;
  let tagTally = _.countBy(arr);
  // let tagFreqObj = {};
  let tagFrequencyArr = [];
  for (key in tagTally) {
    let freq = tagTally[key] / tagTotal;
    tagFrequencyArr.push({
      tag: key,
      frequency: freq
    });
  }
  return tagFrequencyArr;
}

//get frequency for one tag
function getTagFreq(tag, arr) {
  let allFreqs = getTagFrequencyArr(arr);
  let tagFreq = _.find(allFreqs, { tag: tag });
  return tagFreq.frequency;
}

module.exports = { getUniqueTags, getTagFrequencyArr, getTagFreq };
