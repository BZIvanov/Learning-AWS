const express = require('express');
const aws = require('aws-sdk');

const app = express();

const email = '--PROVIDE_EMAIL_HERE--';

// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + '/config.json');

const ses = new aws.SES();

// Verify email addresses.
app.get('/verify', function (req, res) {
  const params = {
    EmailAddress: email,
  };

  ses.verifyEmailIdentity(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Listing the verified email addresses.
app.get('/list', function (req, res) {
  const params = {
    IdentityType: 'EmailAddress',
    MaxItems: 10,
    NextToken: '',
  };

  ses.listIdentities(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Deleting verified email addresses.
app.get('/delete', function (req, res) {
  const params = {
    Identity: email,
  };

  ses.deleteIdentity(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Sending RAW email including an attachment.
app.get('/send-raw', function (req, res) {
  let ses_mail = "From: 'AWS SES' <" + email + '>\n';
  ses_mail = ses_mail + 'To: ' + email + '\n';
  ses_mail = ses_mail + 'Subject: AWS SES Attachment Example\n';
  ses_mail = ses_mail + 'MIME-Version: 1.0\n';
  ses_mail =
    ses_mail + 'Content-Type: multipart/mixed; boundary="NextPart"\n\n';
  ses_mail = ses_mail + '--NextPart\n';
  ses_mail = ses_mail + 'Content-Type: text/html; charset=us-ascii\n\n';
  ses_mail = ses_mail + 'This is the body of the email.\n\n';
  ses_mail = ses_mail + '--NextPart\n';
  ses_mail = ses_mail + 'Content-Type: text/plain;\n';
  ses_mail =
    ses_mail + 'Content-Disposition: attachment; filename="attachment.txt"\n\n';
  ses_mail = ses_mail + 'AWS SES - Really cool file attachment!' + '\n\n';
  ses_mail = ses_mail + '--NextPart--';

  const params = {
    RawMessage: { Data: new Buffer.from(ses_mail) },
    Destinations: [email],
    Source: "'AWS SES' <" + email + ">'",
  };

  ses.sendRawEmail(params, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Sending simple email.
app.get('/send-formatted', function (req, res) {
  const params = {
    Destination: {
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: ['--PROVIDE_EMAIL_HERE--'],
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
    ReplyToAddresses: [],
    Source: '--PROVIDE_YOUR_VERIFIED_MAIL_HERE--',
  };

  ses.sendEmail(params, function (err, data) {
    if (err) {
      res.send(err, err.stack);
    } else {
      res.send(data);
    }
  });
});

// Start server.
const server = app.listen(80, function () {
  const port = server.address().port;
  console.log(`AWS SES example app listening at http://localhost:${port}`);
});
