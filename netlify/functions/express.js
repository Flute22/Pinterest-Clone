const serverless = require('serverless-http');
const app = require('../../app');  // adjust the path as needed

module.exports.handler = serverless(app);
