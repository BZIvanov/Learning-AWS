const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use('/', routes);

const PORT = 3100;
app.listen(PORT, function () {
  console.log(`AWS cognito example app listening at http://localhost:${PORT}`);
});
