var ModelInterface = require('../models/model').ModelInterface;

//mock database. keys are ids
var testDb = {
  1: {property: 'first', id: 1},
  2: {property: 'second', id: 2},
};

//empty constructor
var TestModel = function () {};

TestModel.prototype = Object.create(ModelInterface);

module.exports = TestModel;

TestModel.prototype.create = function (hash, callback) {
  var newModel = hash;
  newId = 3;

  newModel.id = newId
  //store the newModel in the hash
  testDb[newId] = newModel; 
  callback(null, newModel);
};

TestModel.prototype.update = function (id, hash, callback) {
  var updatedModel = testDb[id];

  if (!updatedModel) { callback('no model found'); } 
  
  Object.keys(hash).forEach(function (property) {
    updatedModel[property] = hash[property]; 
  });

  callback(null, updatedModel); 
};

TestModel.prototype.delete = function (id, callback) {
  delete testDb[id]; 
  if (testDb[id]) { 
    callback('model not deleted from db');
  } else {
    callback(null);
  }
};

TestModel.prototype.findById = function (id, callback) {
  var foundModel = testDb[id]; 
  if (foundModel) { 
    callback(null, foundModel); 
  } else {
    callback(null, {});
  }
};

TestModel.prototype.findByQuery = function (query, callback) {
  var id = query.id
    , foundModel = testDb[id];
  if (foundModel) { 
    callback(null, foundModel); 
  } else {
    callback(null, {});
  }
};

TestModel.prototype.findManyByQuery = function (query, callback) {
  var property = query.property
    , models = []

  for (var param in query) {
    for (var each in testDb) {
      if (query[param] === testDb[each][param]) {
        models.push(testDb[each]);
      }
    }
  }
  callback(null, models);
};

//trivial testmodel just returns the model
TestModel.prototype.normalizeFields = function (model) {
  var substring = "id"
    , formattedModel
    , modelParams = Object.keys(model)
    , candidateIds = modelParams.map(function(param) { 
      if (param.indexOf(substring) !== -1) { return param }
      })
    , candidateId = candidateIds[0]; 
    
  formattedModel = model; 

  if (candidateIds.length !== 1) { 
    throw new Error('more than 1 candidate id'); 
  }
  
  formattedModel.id = formattedModel[candidateId];
  delete formattedModel[candidateId];

  return formattedModel;
};
