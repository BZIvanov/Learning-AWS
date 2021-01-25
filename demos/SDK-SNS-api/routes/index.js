const router = require('express').Router();
const {
  createTopic,
  listTopics,
  getTopicAttributes,
} = require('../controllers/topic');
const { subscribe, listSubscriptions } = require('../controllers/subscribe');
const {
  createPlatformApplication,
  listPlatformApplications,
  createPlatformEndpoint,
  listEndpointsByPlatformApplication,
  getEndpointAttributes,
} = require('../controllers/platform-application');

// TOPIC related
router.post('/createTopic', createTopic);
router.get('/listTopics', listTopics);
router.post('/getTopicAttributes', getTopicAttributes);

// PLATFORM APPLICATION related
router.post('/createPlatformApplication', createPlatformApplication);
router.get('/listPlatformApplications', listPlatformApplications);
router.post('/createPlatformEndpoint', createPlatformEndpoint);
router.post(
  '/listEndpointsByPlatformApplication',
  listEndpointsByPlatformApplication
);
router.post('/getEndpointAttributes', getEndpointAttributes);

// SUBSCRIPTIONS related
router.post('/subscribe', subscribe);
router.post('/listSubscriptions', listSubscriptions);

module.exports = router;
