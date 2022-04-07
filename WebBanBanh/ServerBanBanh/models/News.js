const mongoose = require('mongoose')
const Schema = mongoose.Schema

const News = new Schema({
    title: { type: String, index: true},
    img1: { type: String, index: true},
    img2: { type: String, index: true},
    img3: { type: String, index: true},
    date: { type: Date, index: true},
    ma: { type: String, index: true },
    title1: { type: String, index: true},
    title2: { type: String, index: true},
    title3: { type: String, index: true},

  });


  module.exports = mongoose.model('News', News)   