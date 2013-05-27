var ControllerClass = require('./controller')
  , UserModel = require('./../models/usermodel')
  , EncryptionScheme = require('./encryptionscheme');

/*
User controller is a special type of controller that adds
some additional methods to handle authorization
*/

//constructor method for a UserController 
var UserController = function (EncryptionScheme) {
  this.EncryptionScheme = EncryptionScheme;
};

/*
prototype of this modified controller is an instance of the controller
class we passed in.  We pass the usermodel into its constructor 
*/
UserController.prototype = Object.create(new ControllerClass(UserModel));

//override create to encrypt passwords prior to saving
UserController.prototype.create = function (hash, callback) {
  var _this = this;

  //if there is no password defined, do not save
  if (!hash.password) { callback('missing password'); }

  //hash the password before saving
  _this.EncryptionScheme.encrypt(hash.password, function (err, pwHashed) {
    if (err) { callback(err); }

    hash.password = pwHashed;
    _this.model.create(hash, callback);  
  });
};

//override update to encrypt passwords prior to saving
UserController.prototype.update = function (id, hash, callback) {
  var _this = this;

  //if the update hash includes a password, encrypt it before saving
  if (hash.password) {
    _this.EncryptionScheme.encrypt(hash.password, function (err, pwHashed) {
      if (err) { callback(err); }      

      hash.password = pwHashed;
      _this.model.update(id, hash, callback);
    });
  } else {
    _this.model.update(id, hash, callback);
  }
};

module.exports = UserController;
