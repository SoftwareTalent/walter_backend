var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var cors = require('cors')

var emailRouter = require('./routes/sendemail');
var trackRouter = require('./routes/track');
var resumeRouter = require('./routes/resume');

var app = express();
app.use(cors());

dotenv.config({ path: path.resolve(__dirname, '.env') });

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/emails', emailRouter);
app.use('/track', trackRouter);
app.use('/resume', resumeRouter);

module.exports = app;
