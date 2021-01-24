const AWS = require('aws-sdk');

new AWS.Config({
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.subscribe = async (req, res) => {
  const topicArn = req.body.topicArn;
  const applicationEndpoint = req.body.applicationEndpoint;

  const params = {
    TopicArn: topicArn,
    Protocol: 'application',
    Endpoint: applicationEndpoint,
    ReturnSubscriptionArn: true,
  };

  try {
    const result = await sns.subscribe(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
