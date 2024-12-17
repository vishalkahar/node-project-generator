const Bugsnag = require("@bugsnag/js");
const BugsnagPluginExpress = require("@bugsnag/plugin-express");
const dotenv = require("dotenv");

dotenv.config();

Bugsnag.start({
  apiKey: process.env.API_KEY,
  plugins: [BugsnagPluginExpress],
  releaseStage: process.env.NODE_ENV || "development",
});

module.exports = Bugsnag;
