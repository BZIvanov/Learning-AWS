const router = require('express').Router();
const {
  createTopic,
  listTopics,
  getTopicAttributes,
} = require('../controllers/topic');
const { subscribe } = require('../controllers/subscribe');
const {
  createPlatformApplication,
  listPlatformApplications,
  createPlatformEndpoint,
  listEndpointsByPlatformApplication,
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

// SUBSCRIPTIONS related
router.post('/subscribe', subscribe);

module.exports = router;
