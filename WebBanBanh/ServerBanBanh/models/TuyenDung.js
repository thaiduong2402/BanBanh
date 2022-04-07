const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TuyenDung = new Schema({
    ten: { type: String ,index: true},
    viTri: { type: String, index: true },
    soLuong: { type: Number, index: true},
    ngay : {type:Date, index: true}
    
  });


  module.exports = mongoose.model('TuyenDung', TuyenDung)  