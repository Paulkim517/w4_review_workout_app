var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Log = require('./models/log');

mongoose.connect('mongodb://localhost/do_you_even_lift');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/logs', function (req, res) {
  Log.find(function (err, logs) {
    res.json(logs);
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