import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

import {ImageModel} from "../../database/allModels";

import {s3Upload} from "../../Utils/AWS/s3"; //importing utilities for aws configuration

const Router = express.Router();

//MULTER CONFIG
const storage = multer.memoryStorage();
const upload = multer({storage});


/*
Route        /
Des          Uploading the given image to AWS S3 Bucket and then saving the file to mongodb
Params       None
Access       Public
Method       POST
*/

//upload.single is inbuilt function (first we will see how t oupload file through postman)

Router.post("/", upload.single("file"), async(req,res)=> {
  try {
    const file = req.file;
    const bucketOptions = {
      Bucket:"zomatobyruthvik",
      Key: file.originalname, //like for image .png
      Body: file.buffer,
      ContentType: file.mimetype, //like .jpg or .png etc
      ACL: "public-read"  //access 
    };

    const uploadImage = await s3Upload(bucketOptions);
    return res.status(200).json({uploadImage});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;