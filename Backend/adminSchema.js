const mongoose = require("./dbConnection");
const schema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});

const Admin = new mongoose.model("admin", schema);
module.exports = Admin;
