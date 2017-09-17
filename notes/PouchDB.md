# Getting Started with PouchDB

Dealing with Electron, I had to do some searching and combinations of tutorials to get it working correctly, so I'll save my process here:

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

## Using relational-pouch

`relational-pouch` will allow us to link up cases and files, much like mongoose with MongoDB. The difference comes from it's the way both PouchDB and relational-pouch treat data. Here is an example Schema from their documentation located [here](https://github.com/pouchdb-community/relational-pouch):

``` javascript
var db = new PouchDB('mydb');
db.setSchema([
  {
    singular: 'post',
    plural: 'posts',
    relations: {
      author: {belongsTo: 'author'},
      comments: {hasMany: 'comment'}
    }
  },
  {
    singular: 'author',
    plural: 'authors',
    relations: {
      posts: {hasMany: 'post'}
    }
  },
  {
    singular: 'comment',
    plural: 'comments',
    relations: {
      post: {belongsTo: 'post'}
    }
  }
]);

```

Here you can see that they define both the singular and plural version of the data name. This is for search purposes. In `relations` they have that a post belongs to an author, and has many comments. This sets the data structure up so that you can place the authors id and the comment ids along with the data. Pretty cool, right?

Relational-pouch 'side-loads' all relational data by default (i.e. populate). You can change this option by throwing in an async option which can be found on their page. I don't know what we'll decide right now, so I'll leave that out for now.

To help us structure our data we can use [this site](http://andycrum.github.io/ember-data-model-maker/).
