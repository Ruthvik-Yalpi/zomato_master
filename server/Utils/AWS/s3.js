import AWS from "aws-sdk";

const s3Bucket = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
  region: ""
});

export const s3Upload = (options) => {
  return new Promise((resolve,reject) =>
  s3Bucket.upload(options,(error,data)=>{
    if(error) return reject(error);
    return resolve(data);
  })
);
};