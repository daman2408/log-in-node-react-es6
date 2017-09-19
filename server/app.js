import express from 'express';
import morgan from 'morgan';
import config from '../config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from '../UserSchema.js';

const app = express();

mongoose.connect('mongodb://localhost/myProject', {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.set('views', './server/views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get(['/', '/signUp'], (req, res) => {
  res.render('index', {title: 'My Project'});
});

app.get('/jam', (req, res) => {
  res.render('welcome', {title: 'welcome', message: 'Welcome :)'});
});

app.post('/signUp', (req, res, next) => {
  User.findOne({username: req.body.username})
    .then((err, user) => {
      if (user) {
        // res.status(500).send('username already exists');
        console.error(err.stack);
        next(err);
      } else {
        var user = new User(req.body);
        user.save((err, user) => {
          if(err) {
            console.error(err.stack);
            return next(err);
          } else {
            res.json(req.body);
          }
        });
      }
    });
});

app.get('/users', (req, res) => {
  User.find({})
  .then(resp => {
    res.json(resp.map(user => {
      return user.toJson();
    }));
  });
});

//remove all users from the database -- for testing purposes only
app.get('/deleteUsers', (req, res) => {
  User.remove({}, () => {
    console.log('removed users');
  });
});



app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
