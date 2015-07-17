var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Log = require('./models/log'),
    User = require('./models/user'),
    session = require('express-session');

mongoose.connect('mongodb://localhost/do_you_even_lift');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/logs', function (req, res) {
  Log.find(function (err, logs) {
    res.json(logs);
  });
});

app.get('/signup', function (req, res) {
  res.sendFile(__dirname + '/public/views/signup.html');
});

app.post('/users', function (req, res) {
  var newUser = req.body.user;

  User.createSecure(newUser.email, newUser.password, function (err, user) {
    res.redirect('/login');
  });
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/public/views/login.html');
});

app.post('/login', function (req, res) {
  var userData = req.body.user;

  User.authenticate(userData.email, userData.password, function (err, user) {
    req.login(user);
    res.redirect('/profile');
  });
});

app.get('/profile', function (req, res) {
  req.currentUser(function (err, user) {
    res.render('profile', {currentUser: user});
  });
});

app.post('/api/logs', function (req, res) {
  var newLog = new Log({
    type: req.body.type,
    calories: req.body.calories
  });

  // save new phrase in db
  newLog.save(function (err, savedLog) {
    res.json(savedLog);
  });
});

app.listen(3000, function () {
  console.log('server started on localhost:3000');
});