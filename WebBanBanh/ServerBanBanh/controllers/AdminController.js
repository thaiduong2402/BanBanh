const { json } = require('body-parser')
const Account = require('../models/Account')
const Banh = require('../models/Banh')
const TuyenDung = require('../models/TuyenDung')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('../models/Order');
require('dotenv/config')



const express = require('express')
const multer = require('multer')
const AWS = require('aws-sdk')
const { uuid } = require('uuidv4');


const bucketName ="banbanh"
const region =  "us-east-1"
const accessKeyId ="AKIA47PO3DLCCNMGEKPF"
const secretAccessKey = "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"

 


class AdminController{

   checkLogin=(req,res,next) => {

      try {
         var token = req.body.token
         var username = jwt.verify(token, 'thaiduong')

            if(username){
               next()
            }else{
               res.status(400).json('loi')
            }
      } catch (error) {
         res.status(400).json('loi server')
      }
   }

   async checkAdmin(req,res,next){

      try {
         var token = req.body.token       
         var username = jwt.verify(token, 'thaiduong')
         const nameAdmin = username.username
         const user = await Account.findOne({ username: nameAdmin})
         
         console.log(user)
            if(user.role > 1){
               next()
            }else{
               res.status(400).json('loi khong phai admin')
            }
      } catch (error) {
         res.status(400).json('loi server')
      }
   }


   //////////////////////////////////
   async getLogin(req,res,next) {
     
      console.log(req.cookies.token)
      return res.render('/register')


   }
   //////////////////////////////
   async postLogin(req,res,next) {
     
         var username = req.body.username;
         var password = req.body.password;

         const user = await Account.findOne({ username: username})
            if(!user)
            {
               return res.status(400)
            }
            else
            {
               try {
               if(await bcrypt.compare(password, user.password))
               {  
                     console.log('hehe')
                     var token = jwt.sign({username: user.username}, 'thaiduong')
                     return res.status(200).json({
                     message: 'thanh cong',
                     token: token
                     });
               }
               else{
                  return res.status(400)
               }
               } catch (error) {
                  return res.status(500)
               }
            }
         
   }




 ////////////////////////////////////
      async task(req, res, next) {
         console.log(req.data)
         res.send('daa')
      }
      //////////////////////////////
      async addItem(req, res)
         {
            const s3 = new AWS.S3({
               accessKeyId: accessKeyId,
               secretAccessKey: secretAccessKey

            })

            const {item} = req.body;
            
            let myFile = req.file.originalname.split(".")
            const fileType = myFile[myFile.length - 1]
        
            const params = {
               Bucket: bucketName,
               Key: `${uuid()}.${fileType}`,
               Body: req.file.buffer,
               ContentEncoding: 'base64',
               ContentDisposition: 'inline',
               ContentType: 'image/jpeg',           
            }
        
            console.log(req.body.description)
            console.log(req.file)
            console.log(s3)
            s3.upload(params, (error, data) => {
                if(error){
                    res.status(600).send(error)
                }
                
                else{
                  console.log(data.Location)
                  const banh = new Banh({
                     name: req.body.name,
                     img: data.Location,
                     ma: req.body.ma,
                     gia: req.body.gia,
                     loai: req.body.loai,
                     
                 }); 
                 const saveBanh = banh.save();

                 res.status(200).send('thanhcong')

                }
                
                
            })
        }

        async editItem(req, res, next) {
           const ma  = req.body.ma;
           const ten = req.body.name;
           const gia = req.body.gia;
           const loai = req.body.loai;

           try {
            let banh = await Banh.findOneAndUpdate({ma:ma}, {name:ten,gia,loai});
            banh.save();
            res.status(200).send('edit thanh cong')
           } catch (error) {
              res.status(404).send('edit that bai')
           }
        }
        async getAll(req,res,next) {
           const banh = await Banh.find();
           res.json(banh);
        }

        async deleteItem(req,res) {
           await Banh.remove({ma: req.body.ma})
           res.status(200).json('xoa thanh cong')
        }


      async postRegister(req, res) {
         const us = req.body.username;
         const pw = req.body.password;
         const salt = await bcrypt.genSalt();
         const password = await bcrypt.hash(pw,salt)
         
         const ktUS = await Account.findOne({ username: us})

         if(ktUS)
         {
            res.status(400).json({ message:"tai khoan da ton tai"})
         }

         else{
            
         
         const account = await new Account({
            username: us,
            password: password,
            role:1

            
        });
        account.save();

        res.status(200).json({ message:"dang ky thanh cong"})
      }
      }

      async addTuyenDung(req,res){
         const {tuyenDung} = req.body;
         const {viTri} = req.body;
         const {soLuong} = req.body;

         const tuyendung = await new TuyenDung({
            ten:tuyenDung,
            viTri,
            soLuong,
        });

        tuyendung.save()
        res.status(200).json('thanh cong')
        
        
      }

      async donHang(req, res) {
         const order = await Order.find();
         res.json(order)
      }

        
      
      
      
}

module.exports = new AdminController