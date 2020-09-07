const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const config = require('config');
const secret = config.get('app.secret');
const jwt = require("jsonwebtoken");
const { accessSync } = require("fs");
const findOrCreate = require("mongoose-find-or-create");

const ACSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: [true, "is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"]
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false
    },
    salt: String,
    hash: String,
    suspended: { type: Boolean, default: false }
  },
  { timestamps: true }
);

ACSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

ACSchema.methods.setPassword = function(password) {
  // create a salt for the user
  this.salt = crypto.randomBytes(16).toString("hex");
  // create hash value
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

ACSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

ACSchema.methods.generateJWT = function() {
  const today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign(
    {
      sub: "ac-user",
      id: this._id,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

ACSchema.plugin(findOrCreate);

ACSchema.methods.authSerialize = function(accessToken = true) {
  return {
    id: this.id,
    email: this.email,
    isEmailConfirmed: this.isEmailConfirmed,
    accessToken: (() => {
      if (!accessToken) {
        return undefined;
      }
      return this.generateJWT();
    })(),
  };
};

ACSchema.methods.serialize = function() {
  return {
    id: this.id,
    email: this.email,
  };
};

const ACUser = mongoose.model("ACUser", ACSchema);

module.exports = ACUser;
