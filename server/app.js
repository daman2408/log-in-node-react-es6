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

app.use(require('connect-livereload')({
  port: 35729
}));
app.use(morgan('dev'));
app.set('views', './server/views')
app.set('view engine', 'pug');


app.get(['/', '/signUp'], (req, res) => {
  res.render('index', {title: 'Hey', message: 'Hello There!'})
});

app.post('/signUp', (req, res, next) => {
  var user = new User(req.body);
  user.save((err, user) => {
    if(err) {return next(err)}
  })
})

app.use(express.static('public'));

app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
