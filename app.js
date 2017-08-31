import express from 'express'
const app = express();
import morgan from 'morgan';
import config from './config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './UserSchema.js';

mongoose.connect('mongodb://localhost/login');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected :)');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'));
app.set('views', './views')
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get(['/', '/signup'], (req, res) => {
  res.render('index', {title: 'Hey', message: 'Hello There!'})
});

app.post('/signUp', (req, res, next) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return next(err)
    } else {
      console.log(user);
    }
  })
});

app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
