import User from '../user_schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

const signToken = (id) => {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};

exports.verifyUser = function() {
  return function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password) {
      res.status(400).send('username and password are needed');
      return;
    }

    User.findOne({username: username})
      .then((user) => {
        if(!user) {
          res.status(400).send('Wrong Username');
        }
        else {
          let plainPass = password;
          let hashed  = user.password;
          let userId = user._id;
          //compare hashed password in database to hashed value of provided password. if they match, sign token
          if(bcrypt.compareSync(plainPass, hashed)) {
            const token = signToken(userId);
            const userObj = {
              first_name: user.first_name,
              last_name: user.last_name,
              gender: user.gender,
              username: user.username
            };
            res.json({user: userObj, token: token});
          } else {
            res.status(400).send('Wrong Password');
          }
        }
      }, function(err) {
        next(err);
      });
  };
};
