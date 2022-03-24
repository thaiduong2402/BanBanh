const { json } = require('body-parser')
const GioHang = require('../models/GioHang')

class GioHangController{
   async getGioHang(req,res) {
        const hang = await GioHang.find();
        res.json(hang)

   }
   
}

module.exports = new GioHangController