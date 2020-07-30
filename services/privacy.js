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
  // getChecOrder(orderId, commercejsSecretKey) {
  //   return new Promise((resolve, reject) => {
  //     request(
  //       {
  //         url: `https://api.chec.io/v1/orders/${orderId}`,
  //         method: "GET",
  //         headers: {
  //           "X-Authorization": commercejsSecretKey
  //         },
  //         json: true
  //       },
  //       function(err, response, body) {
  //         if (err || body.error) {
  //           reject((err || body.error));
  //         }
  //         resolve(body);
  //       }
  //     );
  //   });
  // },
  // captureChecOrderManually(payment, notes, commercejsSecretKey) {
  //   return new Promise((resolve, reject) => {
  //     request(
  //       {
  //         url: `https://api.chec.io/v1/orders/${payment.checOrderId}/action/capture_manual_payment/${payment.checFuturePaymentId}`,
  //         method: "POST",
  //         headers: {
  //           "X-Authorization": commercejsSecretKey
  //         },
  //         json: true,
  //         body: {
  //           transaction_id: payment.id,
  //           notes: `A payment of
  //           ${(payment.wholefund / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})} was successfully split using ${payment.listOfChargeIds.length}
  //           Stripe.js token(s). Search in your Stripe.js dashboard using the
  //           ${payment.id} to locate all the funds. Learn more by logging into
  //           to your Splitjs.com account.`
  //         },
  //       },
  //       function(err, response, body) {
  //         if (err || body.error) {
  //           reject((err || body.error));
  //         }
  //         resolve(body);
  //       }
  //     );
  //   });
  // },
}


