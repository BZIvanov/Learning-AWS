const AWS = require('aws-sdk');

const config = new AWS.Config({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  apiVersion: '2016-04-18',
});

const cisp = new AWS.CognitoIdentityServiceProvider(config);

exports.createUserPool = async (req, res) => {
  const { poolName } = req.body;

  const params = {
    // NAME
    PoolName: poolName,
    // ATTRIBUTES
    UsernameAttributes: ['email'], // if you want to go with 'Username' replace this property with 'AliasAttributes'
    UsernameConfiguration: {
      CaseSensitive: false,
    },
    Schema: [
      { Name: 'email', Mutable: true, Required: true },
      {
        Name: 'gender',
        Mutable: false,
        Required: true,
        AttributeDataType: 'String',
        StringAttributeConstraints: {
          MinLength: '4',
          MaxLength: '6',
        },
      },
    ],
    // POLICIES
    Policies: {
      PasswordPolicy: {
        MinimumLength: 8,
        RequireNumbers: true,
        RequireSymbols: true,
        RequireUppercase: true,
        RequireLowercase: true,
        TemporaryPasswordValidityDays: 9,
      },
    },
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: false,
    },
    // MFA AND VERIFICATION
    MfaConfiguration: 'OFF',
    AccountRecoverySetting: {
      RecoveryMechanisms: [
        {
          Priority: 1,
          Name: 'verified_email',
        },
      ],
    },
    AutoVerifiedAttributes: ['email'],
    // MESSAGE CUSTOMIZATION
    EmailConfiguration: {
      SourceArn:
        'arn:aws:ses:us-east-1:134956957592:identity/biser.ivanov@gmail.com',
      From: 'biser.ivanov@gmail.com',
      ReplyToEmailAddress: 'biser.ivanov@gmail.com',
      EmailSendingAccount: 'DEVELOPER',
    },
    EmailVerificationSubject: 'Welcome new user',
    EmailVerificationMessage: 'Your verification code is {####}.',
    // TAGS
    UserPoolTags: {
      MyPoolTag: 'MyCustomPoolTag',
    },
    // DEVICES
    UserPoolAddOns: {
      AdvancedSecurityMode: 'OFF',
    },
  };

  try {
    const result = await cisp.createUserPool(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.listUserPools = async (req, res) => {
  const { maxResults, nextToken } = req.body;

  const params = {
    MaxResults: maxResults,
  };

  if (nextToken) {
    params['NextToken'] = nextToken;
  }

  try {
    const result = await cisp.listUserPools(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createGroup = async (req, res) => {
  const { name, poolId } = req.body;

  const params = {
    GroupName: name,
    UserPoolId: poolId,
    Description: 'My custom group',
    Precedence: 1,
  };

  try {
    const result = await cisp.createGroup(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.adminCreateUser = async (req, res) => {
  const { name, poolId } = req.body;

  const params = {
    Username: name,
    UserPoolId: poolId,
    DesiredDeliveryMediums: ['EMAIL'],
    TemporaryPassword: '12qwAS!@',
    ForceAliasCreation: false,
    UserAttributes: [
      {
        Name: 'email',
        Value: 'biser__ivanov@gmail.com',
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
      {
        Name: 'gender',
        Value: 'male',
      },
    ],
  };

  try {
    const result = await cisp.adminCreateUser(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createUserPoolClient = async (req, res) => {
  const { name, poolId } = req.body;

  const params = {
    ClientName: name,
    UserPoolId: poolId,
    GenerateSecret: false,
    ExplicitAuthFlows: ['ALLOW_USER_SRP_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH'],
    RefreshTokenValidity: 30,
    PreventUserExistenceErrors: 'ENABLED',
  };

  try {
    const result = await cisp.createUserPoolClient(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
