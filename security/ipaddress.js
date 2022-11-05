const connection = require("../config/database");
const Request = connection.models.Request;
const Device = connection.models.Device;


//Check if the current IP Address is allowed to access the site
//If not the user needs to validate the captcha
let ipAddressCheck = (req, res, next) => {
  Device.find(
    {
      ip: req.ip,
      allowed: false,
    },
    (err, data) => {
      if (err) {
        console.log("Couldn't connect to database");
        next();
      } else if (data.length === 0) {
        next();
      } else {
        //Show a captcha challenge
        res.render("recaptcha");
      }
    }
  );
};


//Save the IP Address and the request time in a database
let saveRequest = (req, res, next) => {
  new Request({ ip: req.ip, timestamps: Date.now() }).save((err, data) => {
    if (err) {
      console.log(err);
    }
    next();
  });
};


module.exports = { ipAddressCheck, saveRequest };
