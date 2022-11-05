const connection = require("../config/database");
require('dotenv').config({path:__dirname+'/../.env'});
const Session = connection.models.Session;


let securityChecks = async (req, res, next) => {

  //Save the IP Address and the request time in a database
  new Session({ip: req.ip, timestamps: Date.now()}).save((err, data) => {
        if (err) console.log(err);  
  });


  //Check for possible DDoS Attacks  
  let ddosAttack = await checkDDosAttack(req);
  console.log(ddosAttack);
  if (!ddosAttack) {
    console.log("No DDoSAttack");
    next();
  } else {
    console.log("DDoSAttack");
    res.render("recaptcha");
  }
};


//Check the number of requests in a certain amount of time from a certain IP Address
let checkDDosAttack = (req) => {
  return new Promise(resolve => {
    Session.find(
      {
        ip: req.ip,
        timestamps: { $gt: Date.now() - process.env.TIME }
      },
      (err, data) => {
        if (err) {
          console.log("Couldn't connect to database");
          resolve(false);
        } else {
          console.log(data);
          if(data.length > process.env.ALLOWEDRPS) resolve(true);
          else resolve(false);
        }
      }
    );
  })
};

module.exports = securityChecks;
