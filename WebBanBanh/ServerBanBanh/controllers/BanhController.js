const { json } = require('body-parser')
const Banh = require('../models/Banh')

class BanhController {
  async index(req,res) {
   
      if(!req.body.loai || req.body.loai==='')
      {
        const banh = await Banh.find();
        res.json(banh)
        console.log("empty :"+req.body.loai)
      }
      else{
        const banh = await Banh.find({loai:req.body.loai})
        res.json(banh)
        console.log("rs: "+ req.body.loai)
      }
    }

  async getItem(req,res){
    const banh = await Banh.findOne({ma:req.query.ma})
    if(banh)
    {
      res.json(banh)
      console.log(banh)
    }
    else{
      res.status(400)
    }
  }
   
}

module.exports = new BanhController