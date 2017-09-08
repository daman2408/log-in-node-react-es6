import express from 'express'
const app = express();
import morgan from 'morgan';
import config from '../config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from '../UserSchema.js';

mongoose.connect('mongodb://localhost/myProject', {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.set('views', './server/views')
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json())

app.get(['/', '/signUp'], (req, res) => {
  res.render('index', {title: 'Hey', message: 'Hello There!'})
});

app.post('/signUp', (req, res, next) => {
  var user = new User(req.body);
  console.log(user);
  user.save((err, user) => {
    if(err) {return next(err)}
  })
});



app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
