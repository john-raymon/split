/**
 * config
 */
const config = require('config');

/**
 * request
 */
const request = require("request");

const privacyApiKey = config.get('privacy.apiKey');
const privacyUrl = config.get('privacy.url');

module.exports = {
  /**
   * Makes Privacy API request adding a funding bank account for the user
   * @param {Object} bankData
   * @param {String} accountToken
   */
  addFundingBankAccount(bankData, accountToken) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `${privacyUrl}fundingsource/bank?account_token=${accountToken}`,
          method: "POST",
          headers: {
            "Authorization": `api-key ${privacyApiKey}`
          },
          json: true,
          body: bankData,
        },
        function(err, response, body) {
          if ((err || body.error) || response.statusCode !== 200) {
            reject((err || body.error) || body);
          }
          debugger;
          resolve(body);
        }
      );
    });
  },
  /**
   * Makes a Privacy API request to enroll a user, returning a pass or a failure response
   * @param {Object} userData
   */
  enrollUser(userData) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `${privacyUrl}enroll/consumer`,
          method: "POST",
          headers: {
            "Authorization": `api-key ${privacyApiKey}`
          },
          json: true,
          body: userData,
        },
        function(err, response, body) {
          if ((err || body.error) || response.statusCode !== 200) {
            reject((err || body.error) || body);
          }
          resolve(body);
        }
      );
    });
  }
}


