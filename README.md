# Simple crud operation mongodb

## INSTALL


```js
npm install mongo-simple-curd --save-dev
```

## USAGE

### Find

```js

var mongo = require("mongodb").MongoClient;
var query = require("mongo-simple-curd");
var assert = require("assert");

// Take all documents.

mongo.connect("mongodb://localhost/test", function (err, db) {
	
	assert.equal(err, null);
	
	query("collectionName").find(db, function (data) {
		
		db.close();
		console.dir(data);
	
	});

});

// Or Take the documents who matching to your defined feature
// and project all fields

mongo.connect("mongodb://localhost/test", function (err, db) {
	
	assert.equal(err, null);
	
	var where = {name: "john"};
	
	query("collectionName").find(db, where, function (data) {
		
		db.close();
		console.dir(data);
	
	});

});

// Or Take the documents who matching to your defined feature
// and project you defined fields

mongo.connect("mongodb://localhost/test", function (err, db) {
	
	assert.equal(err, null);
	
	var where = {name: "john"};
	var project = {_id: 0};
	
	query("collectionName").find(db, [where, project], function (data) {

		db.close();
		console.dir(data);
	
	});

});

```

### Insert

```js

var mongo = require("mongodb").MongoClient;
var query = require("mongo-simple-curd");
var assert = require("assert");

mongo.connect("mongodb://localhost/test", function (err, db) {
	
	assert.equal(err, null);

	query("collectionName").insert(db, {name: "john"} function (data) {
	
		db.close();
		console.dir(data);
	
	});

});

// OR

mongo.connect("mongodb://localhost/test", function (err, db) {
	
	assert.equal(err, null);
	
	var data = [{name: "john"}, {name: "Alice"}];

	query("collectionName").insert(db, data, function (r) {
	
		db.close();
		console.dir(r);
	
	});

});

```

### Update


```js
var mongo = require("mongodb").MongoClient;
var query = require("mongo-simple-curd");
var assert = require("assert");

mongo.connect("mongodb://localhost/test", function (err, db) {

	assert.equal(err, null);
	
	var where = {name: "john"};
	var set = {name: "Andrew"};
	
	query("collectionName").updateOne(db, [where, set], function (r) {
	
		db.close();
		console.dir(r);
	
	});

});

```

__Some as `updateMany` function__


Delete
------

```js
var mongo = require("mongodb").MongoClient;
var query = require("mongo-simple-curd");
var assert = require("assert");

mongo.connect("mongodb://localhost/test", function (err, db) {
	
	assert.equal(err, null);
	
	var where = {name: "john"};
	
	query("collectionName").deleteOne(db, where, function (r) {
		
		db.close();
		console.dir(r);
	
	});

});

```

__Some as `deleteMany` function__

### License

MIT
