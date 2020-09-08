const Passport = require("passport").Passport;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("@/models/User");
const AuthorizedCardholder = require("@/models/AuthorizedCardholder")

const userPassport = new Passport();
userPassport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function(email, password, done) {
      User.findOne({ email })
        .then(function(user) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              name: 'UnauthorizedError',
              message: 'The email or password is incorrect.'
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

const authorizedCardholderPassport = new Passport();
authorizedCardholderPassport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function(email, password, done) {
      AuthorizedCardholder.findOne({ email })
        .then(function(user) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              name: 'UnauthorizedError',
              message: 'The email or password is incorrect.'
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

module.exports = {
  userPassport,
  authorizedCardholderPassport
};
