const router = require("express").Router();

//A Middleware to do some security checks
//Currently it's only checking for DDoS Attacks
const securityChecks = require('../security/security');


router.get("/*", securityChecks, function (req, res) {
  res.render("cleverpush");
});



module.exports = router;