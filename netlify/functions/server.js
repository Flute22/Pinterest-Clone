const serverless = require('serverless-http');
const app = require('../../app'); // Path to your Express app (adjust if needed)

module.exports.handler = serverless(app);