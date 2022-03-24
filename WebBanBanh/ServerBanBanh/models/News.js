const mongoose = require('mongoose')
const Schema = mongoose.Schema

const News = new Schema({
    title: { type: String, index: true},
    img: { type: String, index: true},
    date: { type: Date, index: true},
    id: { type: Number, default: 0 },
    content: {type: String, index: true}
  });


  module.exports = mongoose.model('News', News)   