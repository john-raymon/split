require("dotenv").config();


module.exports = {
  url: "http://staging.splitkind.com/",
  app: {
    dbPort: 3000,
    secret: process.env.APP_SECRET_KEY_PROD,
    mongodbUri: process.env.MONGODB_URI_PROD
  },
  privacy: {
    apiKey: process.env.PRIVACY_PROD_API_KEY,
    url: process.env.PRIVACY_PROD_URL,
    plan: process.env.PRIVACY_CARD_ISSUE_PLAN === 'enterprise',
    adminEmail: process.env.PRIVACY_ADMIN_EMAIL,
  },
}
