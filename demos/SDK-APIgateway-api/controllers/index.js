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

// This is one of the keys accessible from the menu on the left *API Keys*, so this key is not specific for one of your APIs,you can access it from any of your APIs.
exports.createApiKey = async (req, res) => {
  const keyName = req.body.name;

  const params = {
    name: keyName,
    description: 'my api key description',
  };

  try {
    const result = await apigateway.createApiKey(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createResource = async (req, res) => {
  const apiId = req.body.apiId;
  const parentId = req.body.parentId;
  const path = req.body.path;

  const params = {
    restApiId: apiId,
    parentId: parentId,
    pathPart: path,
  };

  try {
    const result = await apigateway.createResource(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getResources = async (req, res) => {
  const id = req.body.id;

  const params = {
    restApiId: id,
  };

  try {
    const result = await apigateway.getResources(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.putMethod = async (req, res) => {
  const apiId = req.body.apiId;
  const resourceId = req.body.resourceId;

  const params = {
    restApiId: apiId,
    resourceId: resourceId,
    httpMethod: 'POST',
    authorizationType: 'NONE',
  };

  try {
    const result = await apigateway.putMethod(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.putIntegration = async (req, res) => {
  const apiId = req.body.apiId;
  const resourceId = req.body.resourceId;

  // for uri we should have a lambda function already prepared
  const params = {
    restApiId: apiId,
    resourceId: resourceId,
    httpMethod: 'POST',
    type: 'AWS_PROXY',
    timeoutInMillis: 10000,
    integrationHttpMethod: 'POST', // for proxy integration this must be POST
    uri:
      'arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:134956957592:function:myTestLambda/invocations',
  };
  try {
    const result = await apigateway.putIntegration(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createDeployment = async (req, res) => {
  const apiId = req.body.apiId;

  const params = {
    restApiId: apiId,
    stageName: 'dev',
    stageDescription: 'dev deploy desc',
    description: 'my current state',
  };
  try {
    const result = await apigateway.createDeployment(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.generateClientCertificate = async (req, res) => {
  const desc = req.body.desc;

  const params = {
    description: desc,
    tags: {
      mytag: 'my cert tag',
    },
  };
  try {
    const result = await apigateway.generateClientCertificate(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getRestApi = async (req, res) => {
  const apiId = req.body.apiId;

  const params = {
    restApiId: apiId,
  };
  try {
    const result = await apigateway.getRestApi(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createUsagePlan = async (req, res) => {
  const name = req.body.name;

  const params = {
    name: name,
    description: 'My plan for checking the usage',
    throttle: {
      burstLimit: 5,
      rateLimit: 10,
    },
    quota: {
      limit: 100,
      offset: 1,
      period: 'WEEK',
    },
  };
  try {
    const result = await apigateway.createUsagePlan(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
