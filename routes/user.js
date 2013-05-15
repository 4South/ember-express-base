/*
All methods will return valid 200 HTTP responses if successful
and otherwise will return 400 HTTP responses with a json body 
"errorMessage": "some message" which may be used to print to the
user on the front-end
*/

//create a new user and log them in
exports.createUser = function ( req, res ) {
  //validate username and password
  //hash the password and store new user in db
  res.send('createuser');
};

exports.updateUser = function ( req, res ) {
  //validate username and password
  //update the user in the db
  res.send('updateuser');
};

exports.deleteUser = function ( req, res ) {
  //delete this user from the db
  //delete models that are related to this user
  res.send('deleteuser');
};

exports.postLogin = function ( req, res ) {
  //return username and user info (not password!)
  //return a token/session cookie
  res.send('postLogin');
};

exports.getLogout = function ( req, res ) {
  //destroys session cookie/token associated w/ this user
  //return logout confirmation
  res.send('getLogout')
};
