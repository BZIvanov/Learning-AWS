const AWS = require('aws-sdk');

new AWS.Config({
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.createPlatformApplication = async (req, res) => {
  const appName = req.body.name;

  const params = {
    Name: appName,
    Attributes: {
      PlatformCredential:
        'AAAAA4vjHSM:APA91bR8xk82LaYahB7sc_mfGg3CtDVclZ1Zint-5wnov61_H9J9KRmaKpq0QBBnZGIg6qVqzkdVcKnumC66NAk9svDBcmWoGIri7CJH3agYZ2R7r_AFL9HEIDzWSuXT8yfsCngNBYmQ',
    },
    Platform: 'GCM', // Android example
  };

  try {
    const result = await sns.createPlatformApplication(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.listPlatformApplications = async (req, res) => {
  try {
    const result = await sns.listPlatformApplications().promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createPlatformEndpoint = async (req, res) => {
  const applicationArn = req.body.applicationArn;
  const token = req.body.token;

  const params = {
    PlatformApplicationArn: applicationArn,
    Token: token, // random dummy string, in real scenario this will be obtained from an actual device
    CustomUserData: 'mymail@mail.com',
  };

  try {
    const result = await sns.createPlatformEndpoint(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.listEndpointsByPlatformApplication = async (req, res) => {
  const applicationArn = req.body.applicationArn;

  const params = {
    PlatformApplicationArn: applicationArn,
  };

  try {
    const result = await sns
      .listEndpointsByPlatformApplication(params)
      .promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getPlatformApplicationAttributes = async (req, res) => {
  const applicationArn = req.body.applicationArn;

  const params = {
    PlatformApplicationArn: applicationArn,
  };

  try {
    const result = await sns.getPlatformApplicationAttributes(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getEndpointAttributes = async (req, res) => {
  const endpointArn = req.body.endpointArn;

  const params = {
    EndpointArn: endpointArn,
  };

  try {
    const result = await sns.getEndpointAttributes(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
