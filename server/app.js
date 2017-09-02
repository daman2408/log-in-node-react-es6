import express from 'express'
const app = express();
import morgan from 'morgan';
import config from './config.js';
import bodyParser from 'body-parser';

app.use(morgan('dev'));
app.set('views', './views')
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {title: 'Hey', message: 'Hello There!'})
});

app.use(express.static('public'));



app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));


// app.get(['/', '/signup'], function (req, res) {
//   res.render('index', { title: 'Hey', message: 'Hello There!' });
// });
//
// app.post('/signUp', function (req, res, next) {
//   var user = new _UserSchema2.default(req.body);
//   user.save(function (err, user) {
//     if (err) {
//       return next(err);
//     } else {
//       console.log(user);
//     }
//   });
// });
//
// app.listen(_config2.default.port, function () {
//   return console.log('Example app listening on ' + _config2.default.port + ' cockSuckas!');
// });
