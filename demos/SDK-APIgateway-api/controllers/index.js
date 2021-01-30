const AWS = require('aws-sdk');

new AWS.Config({
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  apiVersion: '2015-07-09',
});

const apigateway = new AWS.APIGateway({ region: 'us-east-2' });

exports.createRestApi = async (req, res) => {
  const apiName = req.body.name;

  const params = {
    name: apiName,
    description: 'simple test api',
    endpointConfiguration: {
      types: ['REGIONAL'],
    },
  };

  try {
    const result = await apigateway.createRestApi(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
