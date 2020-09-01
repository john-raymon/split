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
