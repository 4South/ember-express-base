var mongoose = require('mongoose');

/*
This object will define our database and expose a method
that takes a path to connect the database on
*/

//database interface definition
var DatabaseInterface = {
  connect: function (path) {},
};

var MongooseDatabase = function (mongoose) {
  this.mongoose = mongoose;
};

MongooseDatabase.prototype = Object.create(DatabaseInterface);

MongooseDatabase.prototype.connect = function (path) {
  this.mongoose.connect(path, function() {
    console.log('mongodb connected at', path);
  });
};

module.exports = new MongooseDatabase(mongoose);
