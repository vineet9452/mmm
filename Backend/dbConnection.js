const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Aditya')
.then(()=>console.log('DB connected!!'))
.catch(()=>console.log("Connection failed!!"))

module.exports = mongoose;
