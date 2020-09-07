const express = require('express');
const router = express.Router();
const service = require('@/services/users');
const mailgunService = require('@/services/mailgun');
const privacyService = require('@/services/privacy');
const middleware = require('@/middleware');
const crypto = require("crypto");

const hostUrl = require('config').get('url');

/**
 * models
 */
const AuthorizedCardholder = require('@/models/AuthorizedCardholder');
const SharedCardRecord = require('@/models/SharedCardRecord');

/**
 * passports
 */
const { authorizedCardholderPassport } = require('@/config/passport');

/**
 * utils
 */
const isBodyMissingProps = require('@/utils/isBodyMissingProps');

router.get('/cardholders/check', function(req, res, next) {
  return AuthorizedCardholder.findOne({ email: req.query.email })
    .exec()
    .then((cardholder) => {
      if (!cardholder) {
        next({
          name: "BadRequest",
          message: "The cardholder account could not be found.",
        })
      }
      const hasOnBoarded = !!cardholder.hash;
      return res.json({
        success: true,
        hasOnBoarded,
        cardholder: cardholder.serialize(),
      })
    })
    .catch(next);
});

router.post('/cardholders/onboard', function(req, res, next) {
  const requiredProps = [
    ['email', 'The cardholder\'s email is required'],
    ['password', 'A password is required'],
  ];

  const { hasMissingProps, propErrors } = isBodyMissingProps(
    requiredProps,
    req.body
  );

  if (hasMissingProps) {
    return next({
      name: "ValidationError",
      errors: propErrors
    });
  }

  const { email, password, randomKey } = req.body;

  return AuthorizedCardholder.findOneAndUpdate({ email, randomKey }, { randomKey: crypto.randomBytes(16).toString("hex") })
    .exec()
    .then(function(cardholder) {
      if (!cardholder || cardholder.randomKey !== randomKey) {
        throw {
          name: "ValidationError",
          errors: {
            email: { message: "The cardholder account could not be found." }
          }
        };
      }
      cardholder.setPassword(password);
      return cardholder
        .save()
        .then(function(cardholder) {
          return res.json({ success: true, cardholder: cardholder.authSerialize() });
        })
    })
    .catch(next);
});

router.post('/cardholders/login', function(req, res, next) {
  const requiredProps = [
    ['email', 'The cardholder\'s email is required'],
    ['password', 'A password is required'],
  ];

  const { hasMissingProps, propErrors } = isBodyMissingProps(
    requiredProps,
    req.body
  );

  if (hasMissingProps) {
    return next({
      name: "ValidationError",
      errors: propErrors
    });
  }

  const { email, password } = req.body;
  return next();
}, function(req, res, next) {
  return authorizedCardholderPassport.authenticate('local', function(err, user, data) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({ ...data, success: false });
    }

    return res.json({ success: true, cardholder: user.authSerialize() });
  })(req, res, next);
})

router.post('/', ...service.create);

router.get('/', middleware.requireAuthUser, function(req, res, next) {
  return res.json({
    user: req.authUser.authSerialize(false),
  })
})

router.post('/login', ...service.login);

router.post('/fundingsources/bank', middleware.requireAuthUser, function(req, res, next) {
  return privacyService.addFundingBankAccount({
    routing_number: req.body.routing_number,
    account_number: req.body.account_number,
    account_name: req.body.account_name,
  }, req.authUser.privacyAccountToken)
    .then(({data}) => res.json(data))
    .catch(next);
})

router.get('/fundingsources', middleware.requireAuthUser, function(req, res, next) {
  return privacyService.getAllFundingSources({
    account_token: req.authUser.privacyAccountToken,
  })
    .then((fundingSources) => res.json({
      fundingSources: fundingSources
    }))
    .catch((error) => { next(error); });
})

router.post('/share-card', middleware.requireAuthUser, async function(req, res, next) {
  const requiredProps = [
    ['cardToken', 'The card token must be provided.'],
    ['recipientEmail', 'The recipients email must be provided.'],
  ];

  const { hasMissingProps, propErrors } = isBodyMissingProps(
    requiredProps,
    req.body
  );

  if (hasMissingProps) {
    return next({
      name: "ValidationError",
      errors: propErrors
    });
  }

  const { cardToken, recipientEmail } = req.body;

  /**
   * find or create an a.c. user
   * this account will be fully set-up (password set-up) by the a.c.
   * themselves when first time accessing
   */
  const randomKey = crypto.randomBytes(7).toString("hex");
  AuthorizedCardholder.findOrCreate({
    email: recipientEmail
  }, { randomKey }, function(err, acUser) {
    if (err) {
      return next(err);
    };
    /**
     * find or create shared-card record for the a-c user and explicitly
     * set sharing to true then send an email to the user
     */
    SharedCardRecord.findOrCreate({
      authorizedCardholder: acUser.id,
      cardToken,
      user: req.authUser.id,
    }, { sharing: true }, async function(err, record) {
      if (err) {
        return next(err);
      };
      await record.populate('authorizedCardholder').populate('user').execPopulate();
      const serializedSharedCardRecord = record.serialize();
      return mailgunService
        .sendSharedCardEmail(acUser.email, {
          customerName: 'there',
          cardholderName: req.authUser.firstName,
          linkToCard: `${hostUrl}shared/${cardToken}?ref=${acUser.randomKey}&email=${acUser.email}`,
        })
        .then((res) => {
        })
        .catch((error) => {
        })
        .finally(() => {
          return res.json({ success: true, sharedCardRecord: serializedSharedCardRecord });
        })
    })
  })
});

router.post('/cards', middleware.requireAuthUser, middleware.limitCards(5), function(req, res, next) {
  const { memo, type, funding_token, state, spend_limit, spend_limit_duration } = req.body;
  return privacyService.createVirtualDebitCard({
    memo,
    type,
    funding_token,
    state,
    spend_limit,
    spend_limit_duration,
  },
    req.authUser.privacyAccountToken,
  )
    .then((virtualCard) => res.json({
      virtualCard
    }))
    .catch((error) => { next(error); });
})

router.get('/cards', middleware.requireAuthUser, function(req, res, next) {
  return privacyService.listVirtualDebitCards(
    req.authUser.privacyAccountToken,
    req.query,
  )
    .then(body => { return res.json(body); })
    .catch(next);
})

router.put('/cards', middleware.requireAuthUser, function(req, res, next) {
  return privacyService.updateVirtualCard(req.body, req.authUser.privacyAccountToken)
    .then(body => { return res.json(body); })
    .catch(next);
})

router.get('/transactions', middleware.requireAuthUser, function(req, res, next) {
  return privacyService.fetchTransactions({
    account_token: req.authUser.privacyAccountToken,
    ...req.query,
  })
    .then(body => res.json(body))
    .catch(next);
})

module.exports = router;
