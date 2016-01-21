"use strict";

var assert = require("assert");

// Query Class contructor
function Query (collectionName) {
	this.collectionName = collectionName;
}

// Find query
Query.prototype.find = function (db, info, cb) {
	
	if (typeof info === "function") {
		cb = info;
		info = [{}, {}];
	} else {
		if(!Array.isArray(info)) {
			info = [info, {}];
		} else {
			if (info.length == 1) {
				info.push({});
			}
		}
	}
	
	var data = [];
	var cursor = db.collection(this.collectionName).find(info[0], info[1]);

	cursor.each(function(err, doc) {
		
		assert.equal(err, null);
			
		if (doc !== null) {
			data.push(doc);
		} else {
			cb(data);
		}
		
	});

	return this;

};

// Insert query
Query.prototype.insert = function (db, data, cb) {
	
	if (!Array.isArray(data)) {
		data = [data];
	}

	data = data.map(function (key, item) {
		item._id = new ObjectID();
		return item;
	});

	db.collection(this.collectionName).insertMany(data, function (err, r) {
		
		assert.equal(err, null);
		cb(r);
	
	});
	
	return this;

};

//Delete query
Query.prototype.deleteOne = function (db, data, cb) {
	
	db.collection(this.collectionName).deleteOne(data, function (err, r) {
		
		assert.equal(err, null);
		cb(r);

	});
	
	return this;

};

Query.prototype.deleteMany = function(db, data, cb) {
		
	db.collection(this.collectionName).deleteMany(data, function (err, r) {
			
		assert.equal(err, null);
		cb(r);

	});

};

// Update query
Query.prototype.updateOne = function (db, data, cb) {
	
	if (Array.isArray(data) {
		if (data.length < 2 && data.length > 2) {
			throw new Error("array size must be 2");
		}
	} else {
			throw new Error("insert data must be array");
	}

	db.collection(this.collectionName).updateOne(data[0], {$set: data[1]}, function (err, r) {
		
		assert.equal(err, null);
		cb(r);
	
	});
	
	return this;

};

Query.prototype.updateMany = function (db, data, cb) {
		
	if (Array.isArray(data) {
		if (data.length < 2 && data.length > 2) {
			throw new Error("array size must be 2");
		}
	} else {
			throw new Error("insert data must be array");
	}

	db.collection(this.collectionName).updateMany(data[0], {$set: data[1]}, function (err, r) {
		
		assert.equal(err, null);
		cb(r);

	});
	
	return this;
};

// Exports my Query module.
module.exports = function (collectionName) {

	return new Query(collectionName);

};
