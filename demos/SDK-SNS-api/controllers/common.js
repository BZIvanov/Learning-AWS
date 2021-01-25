const AWS = require('aws-sdk');

new AWS.Config({
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.publish = async (req, res) => {
  const topicArn = req.body.topicArn;

  const params = {
    Message: 'My awesome message!',
    Subject: 'Testing',
    TopicArn: topicArn, // TargetArn - for direct messaging; PhoneNumber - for sms;
  };

  try {
    const result = await sns.publish(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
