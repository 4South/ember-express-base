var path = require('path')
  , express = require('express')
  , passport = require('./auth/passportconfig').passport
  , verify = require('./auth/passportconfig').verify
  , database = require('./db/database')
  , userRoutes = require('./routes/user');

//create an express app instance
var app = express();

// database connection
var dbPath =  process.env.MONGOLAB_URI ||
              process.env.MONGOHQ_URL ||
              'mongodb://localhost:27017/' + path.basename(__dirname);

database.connect(dbPath);

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

//configure passport for use
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function ( req, res ) {
  res.sendfile(__dirname + "/index.html");
});

app.post( '/user', 
          userRoutes.createUser,
          passport.authenticate('local'),
          userRoutes.postLogin );

app.put( '/user/:id', 
         verify,
         userRoutes.updateUser );

app.delete( 'user/:id', 
            verify,
            userRoutes.deleteUser );

app.post( '/user/login', 
          passport.authenticate('local'),
          userRoutes.postLogin );

app.get( '/user/logout', 
         verify,
         userRoutes.getLogout );

app.listen(app.get('port'), function () {
  console.log('express listening on port ' + app.get('port'));
});
