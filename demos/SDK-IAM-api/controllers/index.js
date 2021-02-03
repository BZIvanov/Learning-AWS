const AWS = require('aws-sdk');

const config = new AWS.Config({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  apiVersion: '2010-05-08',
});

const iam = new AWS.IAM(config);

exports.createGroup = async (req, res) => {
  const { name } = req.body;

  const params = {
    GroupName: name,
  };
  try {
    const result = await iam.createGroup(params).promise();
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
    const result = await iam.createUser(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.addUserToGroup = async (req, res) => {
  const { groupName, userName } = req.body;

  const params = {
    GroupName: groupName,
    UserName: userName,
  };
  try {
    const result = await iam.addUserToGroup(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getGroup = async (req, res) => {
  const { name } = req.body;

  const params = {
    GroupName: name,
  };
  try {
    const result = await iam.getGroup(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createRole = async (req, res) => {
  const { name } = req.body;

  const params = {
    RoleName: name,
    Description: 'My role description.',
    AssumeRolePolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: {
        Effect: 'Allow',
        Principal: { Service: 's3.amazonaws.com' }, // this is our trusted entity, which can assume this role
        Action: 'sts:AssumeRole',
      },
    }),
  };
  try {
    const result = await iam.createRole(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createPolicy = async (req, res) => {
  const { name } = req.body;

  const params = {
    PolicyName: name,
    Description: 'My policy description.',
    PolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: 's3:PutObject',
          Resource: 'arn:aws:s3:::mycorporatebucket/uploads/widgetco/*',
        },
        {
          Effect: 'Deny',
          NotAction: 's3:PutObject', // deny anything but this action
          Resource: 'arn:aws:s3:::mycorporatebucket/uploads/widgetco/*',
        },
        {
          Effect: 'Deny',
          Action: 's3:*',
          NotResource: 'arn:aws:s3:::mycorporatebucket/uploads/widgetco/*',
        },
      ],
    }),
  };
  try {
    const result = await iam.createPolicy(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }

  // on this link you can find more examples
  // https://docs.aws.amazon.com/AmazonS3/latest/dev/example-policies-s3.html
};

exports.createPolicyVersion = async (req, res) => {
  const { arn } = req.body;

  const params = {
    PolicyArn: arn,
    SetAsDefault: true,
    PolicyDocument: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['s3:GetObject', 's3:PutObject'],
          Resource: 'arn:aws:s3:::mycorporatebucket/uploads/widgetco/*',
        },
        {
          Effect: 'Deny',
          NotAction: ['s3:GetObject', 's3:PutObject'],
          Resource: 'arn:aws:s3:::mycorporatebucket/uploads/widgetco/*',
        },
        {
          Effect: 'Deny',
          Action: 's3:*',
          NotResource: 'arn:aws:s3:::mycorporatebucket/uploads/widgetco/*',
        },
      ],
    }),
  };
  try {
    const result = await iam.createPolicyVersion(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getPolicy = async (req, res) => {
  const { arn } = req.body;

  const params = {
    PolicyArn: arn,
  };
  try {
    const result = await iam.getPolicy(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.attachGroupPolicy = async (req, res) => {
  const { groupName, arn } = req.body;

  const params = {
    GroupName: groupName,
    PolicyArn: arn,
  };
  try {
    const result = await iam.attachGroupPolicy(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getUser = async (req, res) => {
  const { name } = req.body;

  const params = {
    UserName: name,
  };
  try {
    const result = await iam.getUser(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
