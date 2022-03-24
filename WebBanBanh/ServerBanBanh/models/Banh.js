const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Banh = new Schema({
    name: { type: String, index: true},
    img: { type: String, index: true},
    ma: { type: String, index: true},
    gia: { type: Number, default: 0 },
    loai: {type: String, index: true}
  });


  module.exports = mongoose.model('Banh', Banh)   