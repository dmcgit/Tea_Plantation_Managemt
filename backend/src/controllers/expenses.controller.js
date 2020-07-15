// Import required packages
var Expenses = require("../models/expenses.model");
var SqlGenerator = require("../utils/sqlGenerator");
var connection = require("../utils/connection");

var sqlGenerator = new SqlGenerator();

// Laborer controller
function ExpensesController() {}

//Get laborer by NIC
ExpensesController.prototype.getExpensesByEID = function(divExpenseID, callback) {
  var sqlQuery = sqlGenerator.getExpensesByEID(divExpenseID);

  connection.query(sqlQuery, function(err, resultExpenses) {
    if (err) {
      callback(null, err);
    } else if (resultExpenses.length == 0) {
      callback("Laborer doesn't exist for the given NIC.");
    } else {
      // *** resultLaborer is the response from DB. therefore attributes must be same as table column names
      var expenses = new Expenses(
            resultExpenses[0].expensesID,
            resultExpenses[0].divExpenseID,
            resultExpenses[0].divNo,
            resultExpenses[0].descriptions,
            resultExpenses[0].date,
            resultExpenses[0].amount,
            resultExpenses[0].status
      );
      callback(expenses);
    }
  });
};

// Get all laborers
ExpensesController.prototype.getAllExpenses = function(callback) {
  var sqlQuery = sqlGenerator.getAllExpenses();

  connection.query(sqlQuery, function(err, resultExpenses) {
    if (err || resultExpenses.length == 0) {
      callback(null, err);
    } else {
      var i = 0;
      var resExpenses = [];

      while (resultExpenses[i]) {
        var expenses = new Expenses(
            resultExpenses[0].expensesID,
            resultExpenses[0].divExpenseID,
            resultExpenses[0].divNo,
            resultExpenses[0].descriptions,
            resultExpenses[0].date,
            resultExpenses[0].amount,
            resultExpenses[0].status
        );
        resExpenses.push(expenses);
        i++;
      }
      callback(resExpenses);
    }
  });
};

// Insert laborer to DB
ExpensesController.prototype.insertExpenses= function(reqBody, callback) {
  connection.beginTransaction(function(err) {
    if (err) {
      callback(null, err);
    }

    // *** request should contain below keys exactly as it is.
    var expenses = new Expenses(
            reqBody.expensesID,
            reqBody.divExpenseID,
            reqBody.divNo,
            reqBody.descriptions,
            reqBody.date,
            reqBody.amount,
            reqBody.status
    );

    var sqlQuery = sqlGenerator.insertExpenses(expenses);
console.log(sqlQuery);
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
          console.log("Transaction Complete.dulNI");
          callback("Laborer successfully inserted into the system!");
        });
      }
    });
  });
};

// Update laborer in DB
ExpensesController.prototype.updateExpenses = function(reqBody, callback) {
  connection.beginTransaction(function(err) {
    if (err) {
      callback(null, err);
    }

    // *** request should contain below keys exactly as it is.
    var expenses = new Expenses(
            reqBody.expensesID,
            reqBody.divExpenseID,
            reqBody.divNo,
            reqBody.descriptions,
            reqBody.date,
            reqBody.amount,
            reqBody.status
    );

    var sqlQuery = sqlGenerator.updateExpenses(expenses);

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

//Delete laborer by NIC
ExpensesController.prototype.deleteExpensesByEID = function(divexpenseID, callback) {
  var sqlQuery = sqlGenerator.deleteExpensesByEID(divexpenseID);

  connection.query(sqlQuery, function(err, resultLaborer) {
    if (err) {
      callback(null, err);
    } else if (resultExpenses.affectedRows == 0) {
      callback("Laborer doesn't exist for the given NIC.");
    } else {
      callback("Laborer successfully deleted from the system!");
    }
  });
};

// Export laborer controller
module.exports = ExpensesController;
