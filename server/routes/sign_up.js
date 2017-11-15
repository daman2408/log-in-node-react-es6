import express from 'express';
const signUpRouter = express.Router();

import User from '../user_schema.js';
import bcrypt from 'bcrypt';

signUpRouter.post('/', (req, res, next) => {
  User.findOne({username: req.body.username})
    .then((err, user) => {
      if (user) {
        res.status(500).send('username already exists');
        return;
      } else {
        const saltRounds = 15;
        const plainPassword = req.body.password;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(plainPassword, salt);
        req.body.password = hash;
        var user = new User(req.body);
        req.user = user;
        user.save((err, user) => {
          if(err) {
            console.error(err.stack);
            return next(err);
          } else {
            res.json(user.toJson());
          }
        });
      }
    });
});


module.exports = signUpRouter;
