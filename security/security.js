let securityChecks = (req, res, next) => {
  //Check for possible DDoS Attacks  
  let ddosAttack = false;
  if (!ddosAttack) {
    console.log("No DDoSAttack");
    next();
  } else {
    console.log("DDoSAttack");
    res.render("recaptcha");
  }
};

module.exports = securityChecks;
