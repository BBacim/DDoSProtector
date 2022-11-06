const connection = require("../config/database");
const { TIME, ALLOWEDR } = require("../config/config");
const Request = connection.models.Request;
const Device = connection.models.Device;


let ddosCheck = async (req, res, next) => {

  //Check for possible DDoS Attacks
  let ddosAttack = await checkDDosAttack(req);
  console.log(ddosAttack);
  if (!ddosAttack) {
    console.log("No DDoSAttack");
    next();
  } else {
    console.log("DDoSAttack");
    //Save this Device as blocked
    Device.updateOne({ ip: req.ip }, {allowed: false}, {upsert: true}, (err, data) => {
      if (err) console.log(err);
    });
    //Show a captcha challenge
    res.redirect("/");
  }
};


//Check the number of requests in a certain amount of time from a certain IP Address
let checkDDosAttack = (req) => {
  return new Promise(resolve => {
    Request.find(
      {
        ip: req.ip,
        timestamps: { $gt: Date.now() - TIME }
      },
      (err, data) => {
        if (err) {
          console.log("Couldn't connect to database");
          resolve(false);
        } else {
          console.log(data);
          if(data.length > ALLOWEDR) resolve(true);
          else resolve(false);
        }
      }
    );
  })
};


module.exports = ddosCheck;
