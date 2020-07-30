require("dotenv").config();

module.exports = {
  app: {
    dbPort: 3000,
    secret: process.env.APP_SECRET_KEY_DEV,
    mongodbUri: process.env.MONGODB_URI_DEV
  },
  privacy: {
    apiKey: process.env.PRIVACY_SANDBOX_API_KEY,
    url: process.env.PRIVACY_SANDBOX_URL,
  },
}
