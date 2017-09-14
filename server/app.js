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

app.post('/signUp', (req, res, next) => {
  var user = new User(req.body);
  user.save((err, user) => {
    if(err) {
      return next(err);
    }
    console.log(user);
  });
});



app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
