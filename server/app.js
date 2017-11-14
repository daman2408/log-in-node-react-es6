import express from 'express';
import path from 'path';
import morgan from 'morgan';
import config from '../config.js';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logInRouter from './routes/login.js';
import signUpRouter from './routes/signUp.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {MemoryRouter as Router, Route} from 'react-router-dom';
import App from '../src/components/App.js';
import User from './UserSchema.js';

const app = express();

mongoose.connect(config.db.url, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get(['/', '/signup'], (req, res) => {
  res.render('home', {title: 'My Project'});
});

app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
app.get('/logout', (req, res, next) => {
  res.redirect('/');
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



app.listen(config.port, (() => console.log(`Example app listening on ${config.port}`)));
