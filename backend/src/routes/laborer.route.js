// Import required packages
var express = require("express");
var router = express.Router();
var LaborerController = require("../controllers/laborer.controller");

var laborerController = new LaborerController();

// GET Route - Get laborer by NIC
router.get("/get/:nic", function(req, res, next) {
  laborerController.getLaborerByNIC(req.params.nic, function(result, err) {
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
  laborerController.getAllLaborers(function(result, err) {
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
  laborerController.insertLaborer(req.body, function(result, err) {
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
  laborerController.updateLaborer(req.body, function(result, err) {
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
router.delete("/delete/:nic", function(req, res, next) {
  laborerController.deleteLaborerByNIC(req.params.nic, function(result, err) {
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
