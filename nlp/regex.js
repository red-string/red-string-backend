//regular expressions for filtering out US phone numbers, web addresses and email addresses, US state abbreviations
const phoneRegEx = /(\(?\d{3}\)?|\d{3})?( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;
const webRegEx = /([(www.)?a-zA-Z0-9@:%._\+~#=]{2,256})\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const stateRegEx1 = /\b((A[AEKLPRSZ])|(C[AOT])|(D[EC])|(F[LM])|(G[AU])|(HI)|(I[ADLN])|(K[SY])|(L[A])|(M[ADEINOST]))[\s,.]?\b/g;
const stateRegEx2 = /\b((N[CDEHJMVY])|(O[HKR])|(P[AR])|(RI)|(S[CD])|(T[NX])|(U[T])|(V[AT])|(W[AIVY]))[\s,.]?\b/g;
const emailRegEx = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/g;

const { getTagFrequencyArr } = require("./tokenizer");

//array of regular expressions to iterate over in matching function
const regExArr = [stateRegEx1, stateRegEx2, emailRegEx, webRegEx, phoneRegEx];

//function to return array of matches which will later serve as tags
function returnRegExTags(input) {
  let matchArr = [];
  let tagArr = [];
  regExArr.forEach(function(item) {
    if (input.match(item)) {
      matchArr = input.match(item);
      matchArr.forEach(function(item) {
        tagArr.push(item);
      });
      matchArr = [];
    }
  });
  return tagArr;
}

//function to create tag objects out of returned tags
function returnTagObjs(tagArr) {
  let tagObjArr = [];
  for (i in tagArr) {
    let tag = tagArr[i];
    let newTagObj = {
      tag: tag
    };
    tagObjArr.push(newTagObj);
  }
  return tagObjArr;
}

function returnRegExObjs(input) {
  return new Promise((resolve, reject) => {
    let tagArr = returnRegExTags(input);
    resolve(returnTagObjs(tagArr));
  });
}

module.exports = { returnRegExTags, returnTagObjs, returnRegExObjs };
