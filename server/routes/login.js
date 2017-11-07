import express from 'express';
const logInRouter = express.Router();
import User from '../UserSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
var verifyUser = require('../auth/auth.js').verifyUser;

logInRouter.post('/', verifyUser());

export default logInRouter;
