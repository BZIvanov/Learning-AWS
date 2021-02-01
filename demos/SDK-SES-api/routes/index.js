const router = require('express').Router();
const {
  verifyEmailIdentity,
  sendEmail,
  createTemplate,
  sendTemplatedEmail,
  getSendStatistics,
  getAccountSendingEnabled,
  deleteTemplate,
} = require('../controllers');

router.post('/verifyEmailIdentity', verifyEmailIdentity);
router.post('/sendEmail', sendEmail);
router.post('/createTemplate', createTemplate);
router.post('/sendTemplatedEmail', sendTemplatedEmail);
router.get('/getSendStatistics', getSendStatistics);
router.get('/getAccountSendingEnabled', getAccountSendingEnabled);
router.post('/deleteTemplate', deleteTemplate);

module.exports = router;
