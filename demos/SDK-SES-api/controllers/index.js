const AWS = require('aws-sdk');

const config = new AWS.Config({
  region: 'us-east-2',
  accessKeyId: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  apiVersion: '2010-12-01',
});

const ses = new AWS.SES(config);

exports.verifyEmailIdentity = async (req, res) => {
  const mail = req.body.mail;

  const params = {
    EmailAddress: mail,
  };

  try {
    const result = await ses.verifyEmailIdentity(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.sendEmail = async (req, res) => {
  const recipient = req.body.recipient;

  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            'This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.',
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'This is the message body in text format.',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    Source: `From Biser Ivanov <biser.ivanov@gmail.com>\r\n`,
  };

  try {
    const result = await ses.sendEmail(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.createTemplate = async (req, res) => {
  const name = req.body.name;

  const params = {
    Template: {
      TemplateName: name,
      SubjectPart: 'Greetings, {{name}}!',
      HtmlPart:
        '<h1>Hello {{name}},</h1><p>Your favorite animal is {{favoriteanimal}}.</p>',
      TextPart: 'Dear {{name}},\r\nYour favorite animal is {{favoriteanimal}}.',
    },
  };

  try {
    const result = await ses.createTemplate(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.sendTemplatedEmail = async (req, res) => {
  const mail = req.body.mail;
  const templateName = req.body.templateName;

  const params = {
    Destination: {
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: [mail],
    },
    Source: 'biser.ivanov@gmail.com',
    Template: templateName,
    TemplateData: JSON.stringify({
      name: 'Biser',
      favoriteanimal: 'dog',
    }),
  };

  try {
    const result = await ses.sendTemplatedEmail(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getSendStatistics = async (req, res) => {
  const params = {};

  try {
    const result = await ses.getSendStatistics(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.getAccountSendingEnabled = async (req, res) => {
  const params = {};

  try {
    const result = await ses.getAccountSendingEnabled(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

exports.deleteTemplate = async (req, res) => {
  const name = req.body.name;

  const params = {
    TemplateName: name,
  };

  try {
    const result = await ses.deleteTemplate(params).promise();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
