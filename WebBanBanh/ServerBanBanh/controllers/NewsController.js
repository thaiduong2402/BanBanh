const { json } = require('body-parser')
const News = require('../models/News')

class NewsController{
   async index(req,res) {
        const news = News.find();
        res.send(news)
   }

   async postNews(req, res) {

      const news = await News.find({ma:req.body.ma})
      res.json(news)
   }
   async getTin(req, res)
   {
      const tin =await News.find().limit(4)
      res.json(tin)
   }
   
}

module.exports = new NewsController