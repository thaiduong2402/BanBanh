const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GioHang = new Schema({
    ma: { type: String, index: true},
    userName: { type: String, index: true},
    soLuong: { type: Number, default: 0 },
  });


  module.exports = mongoose.model('GioHang', GioHang)   