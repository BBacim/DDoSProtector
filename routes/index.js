const router = require("express").Router();

//ipAddressCheck is a Middleware to check if the IP Address is allowed to access to the content
//Otherwise the user should validate the captcha
//saveRequest is a Middleware to save the request IP and the timestamps
const { ipAddressCheck, saveRequest } = require("../security/ipaddress");

//A Middleware to do a DDoS-Attack check
const ddosCheck = require("../security/ddos");

//checkCaptcha is a Middleware to check if the user successfully validated the captcha
//allowIPAddress is a Middleware to allow the IP Address to access the content again
const {checkCaptcha, allowIPAdress} = require("../captcha/handlecaptcha");

router.get("/*", ipAddressCheck, saveRequest, ddosCheck, function (req, res) {
  res.render("cleverpush");
});

router.post("/recaptcha", checkCaptcha, allowIPAdress, function (req, res) {
  res.render("cleverpush");
});

module.exports = router;
