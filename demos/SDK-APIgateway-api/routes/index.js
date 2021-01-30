const router = require('express').Router();
const { createRestApi } = require('../controllers');

router.post('/createRestApi', createRestApi);

module.exports = router;
