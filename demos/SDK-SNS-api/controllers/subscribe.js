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

exports.listSubscriptions = async (req, res) => {
  const nextToken = req.body.nextToken;

  try {
    const params = {};
    if (nextToken) {
      params['NextToken'] = nextToken;
    }

    const result = await sns.listSubscriptions(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getSubscriptionAttributes = async (req, res) => {
  const subscriptionArn = req.body.subscriptionArn;

  try {
    const params = {
      SubscriptionArn: subscriptionArn,
    };

    const result = await sns.getSubscriptionAttributes(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
