require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const uuid = require('uuid/v4');




dotenv.config();



const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

function uploadFile (){
  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
  })


  const params = {
    Bucket:bucketName,
    Key:`${uuid()}.${fileType}`,
    Body:req.file.buffer
  }

  s3.upload(params,(error,data)=>{
    if(error)
      res.status(500).send(error)
    res.status(200).send(data)
  })

}


exports.uploadFile = uploadFile


