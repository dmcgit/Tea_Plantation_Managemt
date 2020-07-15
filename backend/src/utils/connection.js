// Import required packages
var mysql = require('mysql');
var db_config = require('../config/db.config');

// Initialize DB connection
var connection = mysql.createConnection(db_config);

// Export DB connection
module.exports = connection;