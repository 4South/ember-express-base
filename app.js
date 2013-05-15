var path = require('path')
  , express = require('express')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , userRoutes = require('./routes/user');

var app = express();

// database connection
var dbPath =  process.env.MONGOLAB_URI ||
              process.env.MONGOHQ_URL ||
              'mongodb://localhost:27017/' + path.basename(__dirname);
mongoose.connect(dbPath, function () {
  console.log('mongodb connected at', dbPath);
});


// all environments
app.set('port', process.env.PORT || 1234);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({
  secret: 'YOUR SECRET',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function ( req, res ) {
  res.sendfile(__dirname + "/index.html");
});


app.post('/user', /*pass.verifyAuth,*/ userRoutes.createUser);
app.put('/user/:id', /*pass.verifyAuth,*/ userRoutes.updateUser);
app.delete('user/:id', /*pass.verifyAuth,*/ userRoutes.deleteUser);

app.post('/user/login', /*passport.authenticate('local'),*/ userRoutes.postLogin);
app.get('/user/logout', /*passport.authenticate('local'),*/ userRoutes.getLogout);

app.listen(app.get('port'), function () {
  console.log('express listening on port ' + app.get('port'));
});
