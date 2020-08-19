/**
 * config
 */
const config = require('config');

const apiKey = config.get('mailgun.apiKey');
const domain = config.get('mailgun.domain');

/**
 * mailgun
 */
const mailgun = require("mailgun-js")({apiKey, domain});

module.exports = {
  sendWelcomeEmail(to, subject, customerName) {
    debugger;
    const data = {
      from: 'Split - Virtual debit cards <example@example.com>',
      to,
      subject,
      template: 'welcome',
      'v:customer_name': customerName,
    };

    return mailgun.messages().send(data);
  },
};
