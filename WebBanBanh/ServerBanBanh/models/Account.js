const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    username: { type: String, index: true},
    password: { type: String, index: true},
    role :{ type: Number, index: true}
  });


  module.exports = mongoose.model('Account', Account)   