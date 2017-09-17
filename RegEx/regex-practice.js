//regular expressions for filtering out US phone numbers, web addresses and email addresses, US state abbreviations
const phoneRegEx = /(\(?\d{3}\)?|\d{3})?( |-|\.)?(\d{3}( |-|\.)?\d{4})/gi;
const webRegEx = /([(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256})\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
const stateRegEx1 = /\b((A[AEKLPRSZ])|(C[AOT])|(D[EC])|(F[LM])|(G[AU])|(HI)|(I[ADLN])|(K[SY])|(L[A])|(M[ADEINOST]))[\s,.]?\b/g;
const stateRegEx2 = /\b((N[CDEHJMVY])|(O[HKR])|(P[AR])|(RI)|(S[CD])|(T[NX])|(U[T])|(V[AT])|(W[AIVY]))[\s,.]?\b/g;
const emailRegEx = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,6}\b/gi;
// const zipRegEx = ;
// const

//array of regular expressions to iterate over in matching function
const regExArr = [stateRegEx1, stateRegEx2, emailRegEx, webRegEx, phoneRegEx]
let inputStr = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 _+-.,!@#$%^&*();\/|<> 12345 -98.7 3.141 .6180 9,000 +42 (413) 429-6507 555.123.4567 +1-(800)-555-2468 foo@demo.net	bar.ba@test.co.uk www.demo.com john@gmail.com	http://foo.co.uk/ http://regexr.com/foo.html?q=bar https://mediatemple.net";
let tagArr = [];

//function to return array of matches which will later serve as tags
function returnRegExTags () {
  input = inputStr;
  let matchArr = [];
  regExArr.forEach(function(item) {
    if (input.match(item)) {
      matchArr = input.match(item);
      matchArr.forEach(function(item) {
        tagArr.push(item);
    })
    matchArr = [];
  }
  });
  console.log(tagArr);
  return tagArr;
}
