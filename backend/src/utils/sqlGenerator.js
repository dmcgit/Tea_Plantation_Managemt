// SQL Generator
function SqlGenerator() { }

// --------------------------- Laborer Table --------------------------------

// Get laborer by NIC query
SqlGenerator.prototype.getLaborerByNIC = function(nic) {
  var query = "SELECT * FROM laborer WHERE lNIC='" + nic + "'";
  return query;
}

// Get all laborers
SqlGenerator.prototype.getAllLaborers = function() {
  var query = "SELECT * FROM laborer";
  return query;
}

// Insert laborer query
// *** input param should be a Laborer Object (in js cannot define type)
SqlGenerator.prototype.insertLaborer = function(laborer) {
  var query = "INSERT INTO laborer (lNIC, lName, lAddress, mobileNo,lStatus) VALUES (" + 
    "'" + laborer.nic + "', " +
    "'" + laborer.name + "', " +
    "'" + laborer.address + "', " +
    "'" + laborer.mobile_no + "', " +
    "'" + laborer.status + "')";

    // *** use a console.log to view query before do other things.
    // console.log(query);
  return query;
}

// Update laborer query
// *** input param should be a Laborer Object (in js cannot define type)
SqlGenerator.prototype.updateLaborer = function(laborer) {
  var query = "UPDATE laborer SET" +
    " lName='" + laborer.name + "'," +
    " lAddress='" + laborer.address + "'," +
    " mobileNo='" + laborer.mobile_no + "'," +
    " lStatus='" + laborer.status + "' WHERE" +
    " lNIC='" + laborer.nic + "'";

    // *** use a console.log to view query before do other things.
    // console.log(query);
  return query;
}

// Delete laborer by NIC query
SqlGenerator.prototype.deleteLaborerByNIC = function(nic) {
  var query = "DELETE FROM laborer WHERE lNIC='" + nic + "'";
  return query;
}

// ----------------- DB quering method for Insert & Update ------------------
SqlGenerator.prototype.getExpensesByEID = function(divExpenseID) {
  var query = "SELECT * FROM divisionexpenses WHERE divExpenseID='" + divExpenseID + "'";
  return query;
}

SqlGenerator.prototype.insertExpenses = function(divisionexpenses) {
 console.log("sqlgenerator");
 var query = "INSERT INTO divisionexpenses (divExpenseID, divNo, expenseID, descriptions, date, amount, status) VALUES (" + 
    "'" + divisionexpenses.divExpenseID + "', " +
    "'" + divisionexpenses.divNo + "', " +    
    "'" + divisionexpenses.expenseID + "', " +
    "'" + divisionexpenses.descriptions + "', " +
    "'" + divisionexpenses.date + "', " +
    "'" + divisionexpenses.amount + "', " +
    "'" + divisionexpenses.status + "')"; 


    // *** use a console.log to view query before do other things.
    console.log(query);
  return query;
}

SqlGenerator.prototype.getAllExpenses = function() {
  var query = "SELECT * FROM divisonexpenses";
  return query;
}

SqlGenerator.prototype.executeSql = function (connection, query, callback) {
  connection.query(query, function (err, result) {
    if (err) {
      callback(null, err);
    } else {
      callback(result)
    }
  });
}

// Export SQL generator
module.exports = SqlGenerator;