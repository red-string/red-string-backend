let textString = "";

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
    textString = text.toString();
  });
  py.stdout.on("end", function() {
    console.log("Data", textString);
  });
  py.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });
  py.stdin.write(JSON.stringify(text));
  py.stdin.end();
}

module.exports = { maxSizeFileHandler, nlptk };
