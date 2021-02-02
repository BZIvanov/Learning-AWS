const AWS = require('aws-sdk');

const config = new AWS.Config({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  apiVersion: '2010-05-08',
});

const ses = new AWS.IAM(config);

exports.createGroup = async (req, res) => {
  const { name } = req.body;

  const params = {
    GroupName: name,
  };
  try {
    const result = await ses.createGroup(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createUser = async (req, res) => {
  const { name } = req.body;

  const params = {
    UserName: name,
  };
  try {
    const result = await ses.createUser(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
