//model interface definition
var ModelInterface = {
  create: function (hash, callback) {},
  update: function (id, hash, callback) {},
  delete: function (id, callback) {},
  findById: function (id, callback) {}, 
  findByQuery: function (query, callback) {},
  findManyByQuery: function (query, callback) {},
  normalizeFields: function (model) {},
}; 

/*
This Model object wraps the Mongoose ORM for interacting
with "documents" in a MongoDB instance and exists primarily
so that users may define their own DB interface schemes if desired
MongooseModel's strict adherence to the ModelInterface means that
different implementations wrapping alternative ORM/databases may
be created and used interchangeably 
*/

//constructor for MongooseModel
//takes a mongoose model object and sets it as "inner model"
var MongooseModel = function (InnerModel) {
  this.InnerModel = InnerModel;
};

//Implementation of Model interface using mongoose
MongooseModel.prototype = Object.create(ModelInterface);

MongooseModel.prototype.create = function (hash, callback) {
  this.InnerModel.create(hash, callback);
};

MongooseModel.prototype.update = function (id, hash, callback) {
  this.InnerModel.findByIdAndUpdate(id, hash, callback);
};

MongooseModel.prototype.delete = function (id, callback) {
  this.InnerModel.findByIdAndRemove(id, callback);
};

MongooseModel.prototype.findById = function (id, callback) {
  this.InnerModel.findById(id, function (err, model) {
    if (model) { callback(err, this.normalizeFields(model)); }
    callback(err, model); 
  });
};

MongooseModel.prototype.findByQuery = function (query, callback) {
  this.InnerModel.findOne(query, function (err, model) {
    if (model) { callback(err, this.normalizeFields(model)); }
    callback(err, model); 
  });
};

MongooseModel.prototype.findManyByQuery = function (query, callback) {
  this.InnerModel.find(query, function (err, models) {
    var normalizedModels = [];
    if (models) {
      normalizedModels = models.map(this.normalizeFields); 
      callback(err, normalizedModels);
    }
    callback(err, models); 
  });
};

MongooseModel.prototype.normalizeFields = function (model) {
  var normalized = model;
  normalized.id = normalized._id;
  delete normalized._id;
  delete normalized.__v;  
  return normalized;
};

var exports = module.exports;
exports.MongooseModel = MongooseModel;
exports.ModelInterface = ModelInterface;
