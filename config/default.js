require("dotenv").config();

module.exports = {
  app: {
    dbPort: 3000,
    secret: process.env.APP_SECRET_KEY_PROD,
    mongodbUri: process.env.MONGODB_URI_PROD
  },
  /**
   * TODO: change these to production privacy keys
   */
  privacy: {
    apiKey: process.env.PRIVACY_SANDBOX_API_KEY,
    url: process.env.PRIVACY_SANDBOX_URL,
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
}
