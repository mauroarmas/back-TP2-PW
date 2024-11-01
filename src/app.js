var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var qs = require('querystring');
require('./config/setupModel');
const cors = require('cors');

const studentsRoutes = require('./routes/studentsRoutes'); // Cambiado a estudiantes

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('query parse', str => {
    return qs.parse(str);
});

app.use('/api/students', studentsRoutes); // Cambiado a estudiantes

module.exports = app;
