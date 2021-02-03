const router = require('express').Router();
const {
  createGroup,
  createUser,
  addUserToGroup,
  getGroup,
  createRole,
  createPolicy,
  createPolicyVersion,
  getPolicy,
  attachGroupPolicy,
  getUser,
} = require('../controllers');

router.post('/createGroup', createGroup);
router.post('/createUser', createUser);
router.post('/addUserToGroup', addUserToGroup);
router.post('/getGroup', getGroup);
router.post('/createRole', createRole);
router.post('/createPolicy', createPolicy);
router.post('/createPolicyVersion', createPolicyVersion);
router.post('/getPolicy', getPolicy);
router.post('/attachGroupPolicy', attachGroupPolicy);
router.post('/getUser', getUser);

module.exports = router;
