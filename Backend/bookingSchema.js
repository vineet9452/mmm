const mongoose = require("./dbConnection");
const schema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  mobile: {
    type: Number
  },
  email: {
    type: String
  }
});

const stayHome = new mongoose.model("stayHome", schema);
module.exports = stayHome;
