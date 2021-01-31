const router = require('express').Router();
const {
  createRestApi,
  createApiKey,
  createResource,
  getResources,
  putMethod,
  putIntegration,
  createDeployment,
  generateClientCertificate,
  getRestApi,
  createUsagePlan,
} = require('../controllers');

router.post('/createRestApi', createRestApi);
router.post('/createApiKey', createApiKey);
router.post('/createResource', createResource);
router.post('/getResources', getResources);
router.post('/putMethod', putMethod);
router.post('/putIntegration', putIntegration);
router.post('/createDeployment', createDeployment);
router.post('/generateClientCertificate', generateClientCertificate);
router.post('/getRestApi', getRestApi);
router.post('/createUsagePlan', createUsagePlan);

module.exports = router;
