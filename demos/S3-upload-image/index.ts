import * as fs from 'fs';
import * as util from 'util';
import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const readFile = util.promisify(fs.readFile);

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKET_NAME = 'my-random-test-bucket';

const uploadToS3 = async (data: Buffer): Promise<string> => {
  const name = uuidv4() + '.jpg';
  await s3
    .putObject({
      Key: name,
      Bucket: BUCKET_NAME,
      ContentType: 'image/jpg',
      Body: data,
      ACL: 'public-read',
    })
    .promise();

  // below we will return the exact url which will be used for this file in S3
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${name}`;
};

const main = async () => {
  try {
    const data = await readFile('./image.jpg');
    const url = await uploadToS3(data);
    console.log(url);
  } catch (err) {
    console.log(err);
  }
};

main();
