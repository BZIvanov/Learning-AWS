const router = require('express').Router();
const {
  verifyEmailIdentity,
  sendEmail,
  createTemplate,
  sendTemplatedEmail,
} = require('../controllers');

router.post('/verifyEmailIdentity', verifyEmailIdentity);
router.post('/sendEmail', sendEmail);
router.post('/createTemplate', createTemplate);
router.post('/sendTemplatedEmail', sendTemplatedEmail);

module.exports = router;
