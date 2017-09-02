'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UserSchema = require('../UserSchema.js');

var _UserSchema2 = _interopRequireDefault(_UserSchema);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

_mongoose2.default.connect('mongodb://localhost/login');

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('we are connected :)');
});

// parse application/x-www-form-urlencoded
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// parse application/json
app.use(_bodyParser2.default.json());

app.use((0, _morgan2.default)('dev'));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(_express2.default.static('../public'));

app.get(['/', '/signup'], function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello There!' });
});

app.post('/signUp', function (req, res, next) {
  var user = new _UserSchema2.default(req.body);
  user.save(function (err, user) {
    if (err) {
      return next(err);
    } else {
      console.log(user);
    }
  });
});

app.listen(_config2.default.port, function () {
  return console.log('Example app listening on ' + _config2.default.port + ' cockSuckas!');
});