// Import required packages
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routers
var laborerRouter = require('./src/routes/laborer.route');
var expensesRouter = require('./src/routes/expenses.route');
// *** import other routers here

// Initialize express app
var app = express();

// Setup express app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Add headers */
app.use(function (req, res, next) {
  // Website that wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods that wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers that wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Pass to next layer of middleware
  next();
});

// Setup route paths (every route should start as '/api')
app.use('/api/laborer', laborerRouter);
app.use('/api/expenses',expensesRouter);
// *** set route paths here. keep the structure of paths. it will help to handle lots of routes easily.

// Export express application
module.exports = app;
