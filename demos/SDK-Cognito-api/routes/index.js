const router = require('express').Router();
const {
  createUserPool,
  listUserPools,
  createGroup,
  adminCreateUser,
  createUserPoolClient,
} = require('../controllers');

router.post('/createUserPool', createUserPool);
router.post('/listUserPools', listUserPools);
router.post('/createGroup', createGroup);
router.post('/adminCreateUser', adminCreateUser);
router.post('/createUserPoolClient', createUserPoolClient);

module.exports = router;
