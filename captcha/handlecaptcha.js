const fetch = require("node-fetch");
const connection = require("../config/database");
const Device = connection.models.Device;
const { CAPTCHA_SECRET } = require("../config/config");

//Check if the user successfully validated the captcha
let checkCaptcha = (req, res, next) => {
  if (req.body["g-recaptcha-response"]) {
    var urlencoded = new URLSearchParams();
    urlencoded.append("secret", CAPTCHA_SECRET);
    urlencoded.append("response", req.body["g-recaptcha-response"]);

    var requestOptions = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://www.google.com/recaptcha/api/siteverify", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          next();
        } else {
          res.render("recaptcha");
        }
      })
      .catch((error) => console.log("error", error));
  }
};


//Delete the blocked IP from the Database to allow its access to the content again
let allowIPAdress = (req, res, next) => {
  Device.deleteOne({ ip: req.ip })
    .then(function () {
      console.log("IP deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  next();
};

module.exports = { checkCaptcha, allowIPAdress };
