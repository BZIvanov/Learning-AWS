const AWS = require('aws-sdk');

new AWS.Config({
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.createTopic = async (req, res) => {
  const topicName = req.body.name;

  const params = {
    Name: topicName,
    Attributes: {
      DisplayName: 'Display' + topicName,
      // this Delivery policy values are default anyway, here we still provide them as an example
      DeliveryPolicy: JSON.stringify({
        http: {
          defaultHealthyRetryPolicy: {
            numRetries: 3,
            numNoDelayRetries: 0,
            minDelayTarget: 20,
            maxDelayTarget: 20,
            numMinDelayRetries: 0,
            numMaxDelayRetries: 0,
            backoffFunction: 'linear',
          },
          disableSubscriptionOverrides: false,
        },
      }),
    },
    Tags: [
      {
        Key: 'MyTag',
        Value: 'MyTagValue',
      },
    ],
  };

  try {
    const result = await sns.createTopic(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.listTopics = async (req, res) => {
  try {
    const result = await sns.listTopics().promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getTopicAttributes = async (req, res) => {
  const topicArn = req.body.arn;

  const params = {
    TopicArn: topicArn,
  };

  try {
    const result = await sns.getTopicAttributes(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
