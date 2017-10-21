import express from 'express';
import path from 'path';
import morgan from 'morgan';
import config from '../config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from '../UserSchema.js';
import bcrypt from 'bcrypt';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {MemoryRouter as Router, Route} from 'react-router-dom';
import App from '../src/components/App.js';

const app = express();

mongoose.connect('mongodb://localhost/myProject', {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get(['/', '/signup'], (req, res) => {
  // const markup = renderToString(
  //   <Router>
  //     <App />
  //   </Router>
  // );
  // res.render('index', {title: 'My Project', data: markup});
  res.render('index', {title: 'My Project'});
});

app.post('/signUp', (req, res, next) => {
  User.findOne({username: req.body.username})
    .then((err, user) => {
      if (user) {
        // res.status(500).send('username already exists');
        console.error(err.stack);
        next(err);
      } else {
        const saltRounds = 15;
        const plainPassword = req.body.password;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(plainPassword, salt);
        req.body.password = hash;
        var user = new User(req.body);
        user.save((err, user) => {
          if(err) {
            console.error(err.stack);
            return next(err);
          } else {
            res.json(user);
          }
        });
      }
    });
});

app.get('/welcome', (req, res) => {
  res.render('welcome', {title: 'Welcome!'});
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
  })
    .then((resp) => {
      return res.json(resp);
    });
});



app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
