const _ = require("lodash");

let textArr = [];
let splitText = [];
let taggedArr = [];
let thing;

function maxSizeFileHandler(textFile) {
  const length = textFile.length;
  const arraySize = Math.ceil(length / 6500);
  let docsArray = Array(arraySize);
  for (i = 0; i < arraySize; i++) {
    docsArray[i] = textFile.slice(0, 6499);
  }
  return docsArray;
}

function nlptk(text) {
  const spawn = require("child_process").spawn;
  const py = spawn("python3", [__dirname + "/nlptk.py"]);
  py.stdout.on("data", function(text) {
    textArr.push(text.toString());
    splitText = _.split([textArr], "\n");
    fliptext = _.map(splitText, _.trim);
    // taggedArr = _.filter(splitText, /\(.*\)/g);
    taggedArr = fliptext.filter(stuff => stuff.indexOf("(") > -1);

    // textString += text.toString();
  });
  py.stdout.on("end", function() {
    // console.log("Data! ", textArr);
    console.log("splits? ", taggedArr);
    // console.log(taggedArr);
  });
  py.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });
  py.stdin.write(JSON.stringify(text));
  py.stdin.end();
}

module.exports = { maxSizeFileHandler, nlptk };
