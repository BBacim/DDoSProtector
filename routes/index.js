const router = require("express").Router();

//ipAddressCheck is a Middleware to check if the IP Address is allowed to access to the content
//Otherwise the user should validate the captcha
//saveRequest is a Middleware to save the request IP and the timestamps
const { ipAddressCheck, saveRequest } = require("../security/ipaddress");

//A Middleware to do a DDoS-Attack check
const ddosCheck = require("../security/ddos");

router.get("/*", ipAddressCheck, saveRequest, ddosCheck, function (req, res) {
  res.render("cleverpush");
});


module.exports = router;
