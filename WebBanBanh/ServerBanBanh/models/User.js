const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userName: { type: String ,index: true},
    passWord: { type: String, min: 8, index: true },
    name: { type: String }
    
  });


  module.exports = mongoose.model('User', User)   