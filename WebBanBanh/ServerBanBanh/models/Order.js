const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({

    ma: { type: String, index: true},
    ten: { type: String, index: true},
    userName: { type: String, index: true},
    soLuong: { type: Number, default: 0 },
    tongGia :{ type: Number, default: 0 },

  });


  module.exports = mongoose.model('Order', Order)   