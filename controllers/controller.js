//Controller interface definition
var ControllerInterface = {
  create: function (hash, callback) {},
  update: function (id, hash, callback) {},
  delete: function (id, callback) {},
  findById: function (id, callback) {},
  findByQuery: function (query, callback) {},
  findManyByQuery: function (query, callback) {},
};

//constructor for Model Controllers, requires a model
var ModelController = function (model) {
  this.model = model;
}

//model controller interface definition
ModelController.prototype = Object.create(ControllerInterface);

ModelController.prototype.create = function ( hash, callback ) {
  this.model.create(hash, callback);
};

ModelController.prototype.update = function ( id, hash, callback ) {
  this.model.update(id, hash, callback);
};

ModelController.prototype.delete = function ( id, callback ) {
  this.model.delete(id, callback);
};

ModelController.prototype.findById = function ( id, callback ) {
  this.model.findById(id, callback);
};

ModelController.prototype.findByQuery = function ( query, callback ) {
  this.model.findByQuery(query, callback);
};

ModelController.prototype.findManyByQuery = function ( query, callback ) {
  this.model.findManyByQuery(query, callback);
};

module.exports = ModelController;
