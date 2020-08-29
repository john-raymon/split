const jwt = require('express-jwt');
const config = require('config');
const secret = config.get('app.secret');
const mongoose = require('mongoose');
const privacyService = require('@/services/privacy');
// models
const User = require('@/models/User');

function getToken(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const required = jwt({
  secret: secret,
  userProperty: "auth",
  getToken: getToken,
  algorithms: ['HS256'],
});

const optional = jwt({
  secret: secret,
  userProperty: "auth",
  algorithms: ['HS256'],
  credentialsRequired: false,
  getToken: getToken
});

const auth = {
  required,
  optional,
  requireAuthUser: [required, function(req, res, next) {
    const { auth } = req;
    if (auth.sub !== 'user') {
      return next({
        name: "UnauthorizedError",
        message: "You must sign up or sign in."
      });
    }
    return User.findById(auth.id)
      .then(function(user) {
        if (!user) {
          return next({ name: "UnauthorizedError", message: "The password or email may be incorrect." });
        }
        req.authUser = user;
        return next();
      })
      .catch(next);
  }],
  limitCards(limitAmount) {
    return (req, res, next) => {
      return privacyService.listVirtualDebitCards(
        req.authUser.privacyAccountToken,
        req.query,
      )
        .then(body => {
          const activeCards = body.data
            .filter(card => (card.state === 'OPEN' || card.state === 'PAUSED'));
          if (activeCards.length >= limitAmount) {
            return next({
              name: "NotAllowed",
              message: `You have ${activeCards.length} open/paused cards. On your current plan you can only maintain ${limitAmount} active cards.`,
            });
          }
          return next();
        })
        .catch(next);
    }
  },
};

module.exports = auth;
