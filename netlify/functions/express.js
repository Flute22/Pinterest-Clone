const ejs = require('ejs'); // Force inclusion of EJS
const serverless = require('serverless-http');
const app = require('../../app'); // adjust path as needed

module.exports.handler = serverless(app);
