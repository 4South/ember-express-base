var async = require('async')
  , userController = require('./../controllers/usercontroller')
  , send200 = require('./utils').send200
  , send400 = require('./utils').send400;
 

/*
All methods will return valid 200 HTTP responses if successful
and otherwise will return 400 HTTP responses with a json body 
"message": "some message" which may be used to print to the
user on the front-end
*/

//create a new user after checking that this username/email dont exist already
exports.createUser = function ( req, res ) {
  var email = req.body.email
    , username = req.body.username
    , password = req.body.password;

  //check if user by this username or email already exists
  aysnc.parallel([
    function (callback) {
      userController.findUserByQuery({username: username}, function (err, user) {
        callback(err, user);
      });
    },
    function (callback) {
      userController.findUserByQuery({email: email}, function (err, user) {
        callback(err, user);
      });
    },
  ], function (err, results) {
    if (err ) { send400(res, err); }
    
    /*
    async returns an array of possible results, check them for content
    if either has returned a user, it means a user matching the query
    was already in the db so prevent another from being created
    */
    if (results[0]) { send400('user by that username already exists'); }
    if (results[1]) { send400('user with that email already exists'); }

    userController.createUser(req.body, function (err, user) {
      if (err) { send400(res, err); }
    
      console.log(user, 'created');    
      //delete email and then pass the username/pw to generate a token
      delete req.body.email;
      next();
    });  
  });
};

exports.updateUser = function ( req, res ) {
  var updateHash = { 
    username: req.body.username,
    password: req.body.password,
    email: req.body.email 
  };
  userController.findUserById(req.params.id, updateHash, function(err, result) {
    if (err) { send400(res, err); }
    var response = {};

    response['user'] = result;
    send200(res, response);  
  });
};

exports.deleteUser = function ( req, res ) {
  userController.deleteUser(req.params.id, function (err, result) {
    if (err) { send400(res, err); }

    send200(res, {});
  });
};

//only called if login successful, sends id and username
exports.postLogin = function ( req, res ) {
  send200({id: req.user.id, username: req.user.username});
};

//called after successful logout
exports.getLogout = function ( req, res ) {
  send200(res, {});
};
