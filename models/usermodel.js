var mongoose = require('mongoose')
  , ModelClass = require('./model');

/*
Models are declared in the semantics of the ORM of choice
I.E. If a user is using a mongoose model, then they will build
their models in mongoose's semantics and then create an instance 
of the corrosponding Model object that requires the mongoose model
in its constructor
*/

/*
create an instance of a mongoose schema that includes encryption
provided by the bcrypt module
*/
var UserSchema = new mongoose.Schema({
  
  username: { type: String,
              required: true,
              index: { unique: true } },

  password: { type: String,
              required: true },

  email:    { type: String,
              required: true,
              unique: true }
});

/*
this is the mongoose model we will require as a dependency of our
mongoose-based model implementation in the constructor
*/
var User = mongoose.model("User", UserSchema);

console.log(UserModel);
var UserModel = new ModelClass(User);

module.exports = UserModel;
