const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  }
  ,
  hash: {
    type: String,
    require: true,
  }
  ,
  salt:{
    type: String,
    require: true
  }
})


const userModel = mongoose.model('users',userSchema)

module.exports = userModel;