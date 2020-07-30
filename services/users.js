/**
 * config
 */
const config = require('config');

/**
 * models
 */
const User = require('@/models/User');

/**
 * utils
 */
const isBodyMissingProps = require('@/utils/isBodyMissingProps');

/**
 * user passport
 */
const { userPassport } = require('@/config/passport');

const privacy = require('@/services/privacy');

module.exports = {
  /**
   *  create a new User resource
   */
  create: [
    function(req, res, next) {
      const requiredProps = [
        ['email', 'Your email is required'],
        ['firstName', 'Your first name is required.'],
        ['password', 'A password is required'],
        ['lastName', 'Your last name is required'],
        ['billingAddressLine', 'You must provide your billing street address.'],
        ['billingCity', 'You must provide your billing city.'],
        ['billingState', 'You must provide your billing state.'],
        ['billingPostalCode', 'You must provide your billing postal code.'],
        ['billingCountry', 'You must provide your billing country.'],
        ['phoneNumber', 'You must provide a phone number.'],
        ['dob', 'You must provide your date of birth in the format yyyy-mm-dd.', true],
        ['socialLastFour', 'You must provide the last four of your social', true],
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

      const {
        email,
        firstName,
        lastName,
        password,
        billingAddressLine,
        billingCity,
        billingState,
        billingPostalCode,
        billingCountry,
        phoneNumber,
        dob,
        socialLastFour,
      } = req.body;

      const billing = {
        address: {
          line1: billingAddressLine,
          city: billingCity,
          state: billingState,
          postal_code: billingPostalCode,
          country: billingCountry,
        },
      };
      // check if user email is unique
      return User.count({ email })
        .exec()
        .then(function(count) {
          if (count > 0) {
            throw {
              name: "ValidationError",
              errors: {
                email: { message: "The email is already taken" }
              }
            };
          }
          return count;
        })
        .then(() => {
          // enroll on Privacy
          return privacy.enrollUser({
            first_name: firstName,
            last_name: lastName,
            email,
            street1: billingAddressLine,
            zipcode: billingPostalCode,
            dob,
            phone_number: phoneNumber,
            ssn_last_four: socialLastFour,
          });
        })
        .then((privacyRes) => {
          debugger;
          const user = new User({
            email,
            firstName,
            lastName,
            phoneNumber,
            billingAddress: billing.address,
            privacyAccountToken: privacyRes.data.account_token,
          });

          user.setPassword(password);
          return user
            .save()
            .then(function(user) {
              return res.json({ success: true, user: user.authSerialize() });
            })
        })
        .catch(next);
    },
  ],
  /**
   * Authenticate and login a User resource
   */
  login: [
    (req, res, next) => {
      const requiredProps = [
        ['email', 'Your email and password are required to sign in.', true],
        ['password', 'Your email and password are required to sign.', true],
      ];
      const { hasMissingProps, propErrors } = isBodyMissingProps(requiredProps, req.body);
      if (hasMissingProps) {
        return next({
          name: "ValidationError",
          errors: propErrors
        });
      }
      const { email, password } = req.body;
      return next()
    },
    (req, res, next) => userPassport.authenticate("local", function(err, user, data) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({ ...data, success: false });
      }

      return res.json({ success: true, user: user.authSerialize() });
    })(req, res, next),
  ]
};
