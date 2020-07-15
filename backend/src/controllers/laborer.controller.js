// Import required packages
var Laborer = require("../models/laborer.model");
var SqlGenerator = require("../utils/sqlGenerator");
var connection = require("../utils/connection");

var sqlGenerator = new SqlGenerator();

// Laborer controller
function LaborerController() {}

// Get laborer by NIC
LaborerController.prototype.getLaborerByNIC = function(nic, callback) {
  var sqlQuery = sqlGenerator.getLaborerByNIC(nic);

  connection.query(sqlQuery, function(err, resultLaborer) {
    if (err) {
      callback(null, err);
    } else if (resultLaborer.length == 0) {
      callback("Laborer doesn't exist for the given NIC.");
    } else {
      // *** resultLaborer is the response from DB. therefore attributes must be same as table column names
      var laborer = new Laborer(
        resultLaborer[0].lNIC,
        resultLaborer[0].lName,
        resultLaborer[0].lAddress,
        resultLaborer[0].mobileNo,
        resultLaborer[0].lStatus
      );
      callback(laborer);
    }
  });
};

// Get all laborers
LaborerController.prototype.getAllLaborers = function(callback) {
  var sqlQuery = sqlGenerator.getAllLaborers();

  connection.query(sqlQuery, function(err, resultLaborers) {
    if (err || resultLaborers.length == 0) {
      callback(null, err);
    } else {
      var i = 0;
      var resLaborers = [];

      while (resultLaborers[i]) {
        var laborer = new Laborer(
          resultLaborers[i].lNIC,
          resultLaborers[i].lName,
          resultLaborers[i].lAddress,
          resultLaborers[i].mobileNo,
          resultLaborers[i].lStatus
        );
        resLaborers.push(laborer);
        i++;
      }
      callback(resLaborers);
    }
  });
};

// Insert laborer to DB
LaborerController.prototype.insertLaborer = function(reqBody, callback) {
  connection.beginTransaction(function(err) {
    if (err) {
      callback(null, err);
    }

    // *** request should contain below keys exactly as it is.
    var laborer = new Laborer(
      reqBody.laborerNIC,
      reqBody.laborerName,
      reqBody.laborerAddress,
      reqBody.laborerMobileNo,
      reqBody.laborerStatus
    );

    var sqlQuery = sqlGenerator.insertLaborer(laborer);

    sqlGenerator.executeSql(connection, sqlQuery, function(result, err) {
      if (err) {
        connection.rollback();
        callback(null, err);
      } else {
        connection.commit(function(err) {
          if (err) {
            connection.rollback();
            callback(null, err);
          }
          console.log("Transaction Complete.");
          callback("Laborer successfully inserted into the system!");
        });
      }
    });
  });
};

// Update laborer in DB
LaborerController.prototype.updateLaborer = function(reqBody, callback) {
  connection.beginTransaction(function(err) {
    if (err) {
      callback(null, err);
    }

    // *** request should contain below keys exactly as it is.
    var laborer = new Laborer(
      reqBody.laborerNIC,
      reqBody.laborerName,
      reqBody.laborerAddress,
      reqBody.laborerMobileNo,
      reqBody.laborerStatus
    );

    var sqlQuery = sqlGenerator.updateLaborer(laborer);

    sqlGenerator.executeSql(connection, sqlQuery, function(result, err) {
      if (err) {
        connection.rollback();
        callback(null, err);
      } else if (result.affectedRows == 0) {
        connection.rollback();
        callback("Laborer doesn't exist for the given NIC.");
      } else {
        connection.commit(function(err) {
          if (err) {
            connection.rollback();
            callback(null, err);
          }
          console.log("Transaction Complete.");
          callback("Laborer successfully updated in the system!");
        });
      }
    });
  });
};

// Delete laborer by NIC
LaborerController.prototype.deleteLaborerByNIC = function(nic, callback) {
  var sqlQuery = sqlGenerator.deleteLaborerByNIC(nic);

  connection.query(sqlQuery, function(err, resultLaborer) {
    if (err) {
      callback(null, err);
    } else if (resultLaborer.affectedRows == 0) {
      callback("Laborer doesn't exist for the given NIC.");
    } else {
      callback("Laborer successfully deleted from the system!");
    }
  });
};

// Export laborer controller
module.exports = LaborerController;
