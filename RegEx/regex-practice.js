const phoneRegEx = /(\(?\d{3}\)?|\d{3})?( |-|\.)?(\d{3}( |-|\.)?\d{4})/gi;
const webRegEx = /([(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256})\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const stateRegEx1 = /\b((A[AEKLPRSZ])|(C[AOT])|(D[EC])|(F[LM])|(G[AU])|(HI)|(I[ADLN])|(K[SY])|(L[A])|(M[ADEINOST]))[\s,.]?\b/g;
const stateRegEx2 = /\b((N[CDEHJMVY])|(O[HKR])|(P[AR])|(RI)|(S[CD])|(T[NX])|(U[T])|(V[AT])|(W[AIVY]))[\s,.]?\b/g;
const emailRegEx = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/gi;
// const zipRegEx = ;
// const

let regExArr = [stateRegEx1, stateRegEx2, emailRegEx, webRegEx, phoneRegEx]
let inputStr = "";
let tagArr = [];

function returnRegExTags () {
  input = inputStr;
  console.log('input: ' + input)
  let matchArr = [];
  regExArr.forEach(function(item) {
    matchArr = input.match(item);
    matchArr.forEach(function(item) {
      tagArr.push(item);
    })
    matchArr = [];
  });
  console.log(tagArr);
  return tagArr;
}
