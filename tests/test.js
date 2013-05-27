var assert = require('chai').assert
  , testModelClass = require('./testmodel');

var testModel = new testModelClass();

describe('testModelClass', function () {
  it('should be defined', function () {
    assert.isDefined(testModelClass);
  });
});

describe('testModel', function () {

  it('should be defined', function () {
    assert.isDefined(testModel);
  });

  it('should define all interface methods', function () {
    assert.isDefined(testModel.create);
    assert.isDefined(testModel.update);
    assert.isDefined(testModel.delete);
    assert.isDefined(testModel.findById);
    assert.isDefined(testModel.findByQuery);
    assert.isDefined(testModel.findManyByQuery);
    assert.isDefined(testModel.normalizeFields);
  });
  
  //hash of model properties for testing
  var modelHash = {property: 'test'};

  describe('#create', function () {
    it('should create a new model given a hash', function (done) {
      testModel.create(modelHash, function (err, model) {
        assert.equal(model.property, modelHash.property,
                     "property value is the same as inputted value"); 
        done();
      });
    }); 
    it('should assign an id to the created model', function (done) {
      testModel.create(modelHash, function (err, model) {
        assert.isDefined(model.id);
        done(); 
      });
    }); 
  });

  describe('#update', function () {
    var existingModel = modelHash 
      , updateHash= {property: 'altered'};
    existingModel.id = 1;

    it('should update the inputted users properties', function (done) {
      testModel.update(existingModel.id, updateHash, function (err, model) {
        assert.equal(model.property, updateHash.property, 
                     "property value is changed to new value");
        done();
      });
    }); 
    it('should be the same id as the original object', function (done) {
      testModel.update(existingModel.id, updateHash, function (err, model) {
        assert.equal(model.id, existingModel.id, 
                     "id is the same as original model");
        done();
      });
    });
  });

  describe('#delete', function () {
    var idForDeletion = 2;

    it('should delete the model from the database', function (done) {
      testModel.delete(idForDeletion, function (err) {
        done(err);
      });
    });
  });

  describe('#findById', function () {
    var idToFind = 1
      , nonexistentId = 5;

    it('should find a model with the provided id', function (done) {
      testModel.findById(idToFind, function (err, model) {
        assert.equal(
          model.id,   
          idToFind, 
          "found model's id is same as id searched for"
        );
        done();
      });
    });

    it('should return empty object if no model exists', function (done){
      testModel.findById(nonexistentId, function (err, model ) {
        assert.isObject(model, "model is an object");
        assert.lengthOf(Object.keys(model), 0, "model is empty object");
        done();
      }); 
    });
  });
  
  describe('#findByQuery', function () {
    var query = {id: 1}
      , queryKeys = Object.keys(query);
    
    it('should return a model matching the query params', function (done) {
      testModel.findByQuery(query, function (err, model) {
        queryKeys.forEach(function(key) {
          assert.equal(
            query[key], 
            model[key],
            "query value same as model value"
          );
          done();
        });
      });
    });
    
    var query = {popcorn: 'no popcorn'};

    it('should return empty object if no model exists', function (done) {
      testModel.findByQuery(query, function (err, model) {
        assert.isObject(model, "model is an object");
        assert.lengthOf(Object.keys(model), 0, "model is empty object");
        done();
      });
    });
  });

  describe('#findManyByQuery', function () {
    var query = {property: 'first'};

    it('should return an array', function (done) {
      testModel.findManyByQuery(query, function (err, models) {
        assert.typeOf(models, 'array', 'models is an array');
        done();
      });
    });
    
    it('models should include models matching query', function (done) {
      testModel.findManyByQuery(query, function (err, models) {
        models.forEach(function (model) {
          assert.equal(
            model.property,
            query.property,
            "found model's property is the same as query"
          ) 
          done();
        });
      }); 
    });
  });

  describe('#normalizeFields', function (done) {
    var sampleModel = {_id:1}
      , sampleFailingModel = {_id:1, id: 1};

    it('should always return a model with an id property', function () {
      var formattedModel = testModel.normalizeFields(sampleModel);
      assert.isDefined(formattedModel.id);
    });
    it('should return an error if more than 1 candidate id', function () {
      assert.throws(
        function () {
          testModel.normalizeFields(sampleFailingModel);
        }
      );
    });
  });
});
