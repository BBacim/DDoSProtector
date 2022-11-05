const mongoose = require("mongoose");

//Database login data
const {USER, PASSWORD, DATABASE_URL, DATABASE_NAME } = require("../config/config");


//Database connection
mongoose.connect("mongodb+srv://" + USER + ":" + PASSWORD + DATABASE_URL + "/" + DATABASE_NAME, {
  useNewUrlParser: true,
});


//Request Schema
const requestSchema = new mongoose.Schema({ 
  ip: { type: String, required: true },
  timestamps: { type: Number, required: true } 
});
const Request = mongoose.model("Request", requestSchema);

//User-Session Schema
const ipSchema = new mongoose.Schema({ 
  ip: { type: String, required: true },
  allowed: { type: Boolean, required: true } 
});
const Device = mongoose.model("Device", ipSchema);

module.exports = mongoose.connection;