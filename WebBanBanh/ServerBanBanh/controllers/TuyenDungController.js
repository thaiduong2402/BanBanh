const { json } = require('body-parser')
const TuyenDung = require('../models/TuyenDung')

class TuyenDungController{
   async index(req,res) {
        const tuyenDung =await TuyenDung.find()
        res.json(tuyenDung)
   }

  
}

module.exports = new TuyenDungController