// Import required packages
var express = require("express");
var router = express.Router();
var ExpensesController = require("../controllers/expenses.controller");

var ExpensesController = new ExpensesController();

// GET Route - Get laborer by NIC
router.get("/get/:divExpenseID", function(req, res, next) {
  ExpensesController.getExpensesByEID(req.params.divExpenseID, function(result, err) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// GET Route - Get all laborers
router.get("/get-all", function(req, res, next) {
  ExpensesController.getAllExpenses(function(result, err) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// POST Route - Insert a laborer
router.post("/insert", function(req, res, next) {
  console.log("here");
 ExpensesController.insertExpenses(req.body, function(result, err) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// PUT Route - Update a laborer
router.put("/update", function(req, res, next) {
  ExpensesController.updateExpenses(req.body, function(result, err) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// DELETE Route - Delete laborer by NIC
router.delete("/delete/:divExpenseID", function(req, res, next) {
  ExpensesController.deleteExpensesByEID(req.params.div, function(result, err) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.status(200);
      res.json(result);
    }
  });
});

// Export router
module.exports = router;
