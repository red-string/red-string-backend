# Getting Started for Electron

I had to do some searching and combinations of tutorials to get it working correctly, so I'll save my process here:

* `npm install pouchdb`
* `npm install --save-dev electron-rebuild`
* `function npm-do { (PATH=$(npm bin):$PATH; eval $@;) }`
* `npm-do electron-rebuild`

The function is a bash function creation that executes an npm executable, in this case electron-rebuild. Every time we install a new npm module that doesn't work, we'll need to rerun electron-rebuild to see if it works after.

## Testing Instantiation

``` javascript
const PouchDB = require("pouchdb");
const db = new PouchDB("files");

db.info().then(function(info) {
	console.log(info);
});
```

This will return information in node command line.

## Storing a document

PouchDB is a NoSQL database, just like mongo.

``` javascript
var doc = {
  "_id": "mittens",
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};
db.put(doc);
```

## Retrieving Documents

``` javascript
db.get('mittens').then(function (doc) {
  console.log(doc);
});
```

Not too bad.

## IDs in Pouch

Use put and not post. We should control the ids, and if we update we have to use put anway, so we might as well just use one.
