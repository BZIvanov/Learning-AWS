const router = require('express').Router();
const { createGroup, createUser } = require('../controllers');

router.post('/createGroup', createGroup);
router.post('/createUser', createUser);

module.exports = router;
