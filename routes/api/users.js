const express = require('express');
const router = express.Router();
const service = require('@/services/users');
const privacyService = require('@/services/privacy');
const middleware = require('@/middleware');

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

module.exports = router;
