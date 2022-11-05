require('dotenv').config({path:__dirname+'/../.env'}); //Config variables

const mongoose = require("mongoose");

//Database login data
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

//Database connection
mongoose.connect("mongodb+srv://" + USER + ":" + PASSWORD + "@cluster0.akniq.mongodb.net/DDosProxyDB", {
  useNewUrlParser: true,
});


//User-Session Schema
const ipSchema = new mongoose.Schema({ 
  ip: { type: String, required: true },
  timestamps: { type: Number, required: true } 
});

const Session = mongoose.model("Session", ipSchema);

module.exports = mongoose.connection;