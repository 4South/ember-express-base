var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , UserController = require('./../controllers/usercontroller')
  , send200 = require('./../routes/utils').send200
  , send400 = require('./../routes/utils').send400;

//serialize users into session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize user from session
passport.deserializeUser(function (id, done) {
  UserController.findById(id, done);
});

//login authorization strategy
var authStrat = new LocalStrategy(function (username, password, done) {
  //Check if the user is in the database
  UserController.findByQuery({username: username}, function (err, user) {
    //if no user, then return false and include message
    if (!user ) {
      done(err, false, {message: 'no user by that name found'});
    } 
    //if password matches, return the user, otherwise return false and message
    UserController.EncryptionScheme.compare(password, user.password, 
    function (err, isMatch) {
      if (isMatch) {
        return done(err, user);
      } else {
        return done(err, false, {message: 'incorrect password'}); 
      }
    });
  });
});

var verify = function (req, res, next) {
  if (req.isAuthenticated()) { next(); }
  send400('invalid user');
};

//use this is passport's "local strategy"
passport.use(authStrat);

var exports = module.exports;

//expose the configured passport object
exports.passport = passport;
//expose the verification strategy
exports.verify = verify;
