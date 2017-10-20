//general node and document processing modules
const JSZip = require("jszip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const _ = require('lodash');


//Python processing modules for NLP API call
const PythonShell = require('python-shell');
const options = {
  mode: "text",
  scriptPath: __dirname,
  // args: ['hello']
 }
const pyshell = new PythonShell('pythonAPI.py', options);


// PythonShell.run('pythonAPI.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   console.log('results: %j', results);
// });

//
function pyNLP(text) {

  pyshell.send(text)

  pyshell.on('message', function(message) {
    console.log(message)
  })

  pyshell.end(function (err) {
    if (err) {
      throw err
    };
    console.log('finished');
  });

}

module.exports = { pyNLP };
