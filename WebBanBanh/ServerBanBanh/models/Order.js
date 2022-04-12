const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({

    ten: { type: String, index: true},
    userName: { type: String, index: true},
    email:{type: String, index: true},
    tongGia :{ type: Number, default: 0 },
    date: { type: Date, default: new Date}

  });


  module.exports = mongoose.model('Order', Order)   