const router = require('express').Router();
const {
  createTopic,
  listTopics,
  getTopicAttributes,
} = require('../controllers/topic');
const {
  subscribe,
  listSubscriptions,
  getSubscriptionAttributes,
} = require('../controllers/subscribe');
const {
  createPlatformApplication,
  listPlatformApplications,
  createPlatformEndpoint,
  listEndpointsByPlatformApplication,
  getPlatformApplicationAttributes,
  getEndpointAttributes,
} = require('../controllers/platform-application');
const { publish } = require('../controllers/common');

// TOPIC related
router.post('/createTopic', createTopic);
router.get('/listTopics', listTopics);
router.post('/getTopicAttributes', getTopicAttributes);

// PLATFORM APPLICATION related
router.post('/createPlatformApplication', createPlatformApplication);
router.get('/listPlatformApplications', listPlatformApplications);
router.post('/createPlatformEndpoint', createPlatformEndpoint);
router.post(
  '/getPlatformApplicationAttributes',
  getPlatformApplicationAttributes
);
router.post(
  '/listEndpointsByPlatformApplication',
  listEndpointsByPlatformApplication
);
router.post('/getEndpointAttributes', getEndpointAttributes);

// SUBSCRIPTIONS related
router.post('/subscribe', subscribe);
router.post('/listSubscriptions', listSubscriptions);
router.post('/getSubscriptionAttributes', getSubscriptionAttributes);

// COMMON
router.post('/publish', publish);

module.exports = router;
