// Laborer model

// Default constructor
var Laborer = function(nic, name, address, mobile_no, status) {
  this.nic = nic;
  this.name = name;
  this.address = address;
  this.mobile_no = mobile_no;
  this.status = status;
}

// Export laborer model
module.exports = Laborer;