const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  name: String,
  
});

module.exports = mongoose.model("Sweet", sweetSchema);
