var bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

//EncryptionScheme interface definition
var EncryptionScheme = {
  encrypt: function (value, callback) {},
  compare: function (candidateVal, encryptedVal, callback) {},
};

//constructor takes bcrypt
EncryptionSchemeBcrypt = function (bcrypt) {
  this.bcrypt = bcrypt;
};

//implement the EncryptionScheme interface
EncryptionSchemeBcrypt.prototype = Object.create(EncryptionScheme);

EncryptionSchemeBcrypt.prototype.encrypt = function (value, callback) {
  bcrypt.hash(value, SALT_WORK_FACTOR, function (err, hash) {
    if (err) { callback(err); }
    callback(null, hash);
  });
};

//callback returns a boolean
EncryptionSchemeBcrypt.prototype.compare = function (canVal, encVal, callback) {
  bcrypt.compare(canVal, encVal, function (err, res) {
    if (err) { callback(err); }
    callback(null, res);   
  });
};

//create an instance and export
module.exports = new EncryptionSchemeBcrypt(bcrypt);
