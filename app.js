import express from 'express'
const app = express();
import morgan from 'morgan';
import config from './config.js';
import bodyParser from 'body-parser';

app.use(morgan('dev'));
app.set('views', './views')
app.set('view engine', 'pug');

app.get(['/', '/signup'], (req, res) => {
  res.render('index', {title: 'Hey', message: 'Hello There!'})
});

app.use(express.static('public'));


app.listen(config.port, (() => console.log(`Example app listening on ${config.port} cockSuckas!`)));
