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
  sendLandingPageEmail(to) {
    const data = {
      from: 'Transact Labs - <info@transactlabs.io>',
      to,
      subject: "You\'re on the waiting list!",
      template: 'waiting-list',
    };

    return mailgun.messages().send(data).then(body => { debugger; return body; }).catch(err => { throw err; });
  },
  sendWelcomeEmail(to, subject, customerName) {
    const data = {
      from: 'Split - Virtual debit cards <example@example.com>',
      to,
      subject,
      template: 'welcome',
      'v:customer_name': customerName,
    };

    return mailgun.messages().send(data);
  },
  sendSharedCardEmail(to, data) {
    return mailgun.messages().send({
      from: 'Split - Virtual debit cards <example@example.com>',
      to,
      subject: "A virtual debit card has been shared with you!",
      template: 'card-sharing-email',
      'v:customer_name': data.customerName,
      'v:cardholder_name': data.cardholderName,
      'v:link_to_card': data.linkToCard,
    });
  }
};
