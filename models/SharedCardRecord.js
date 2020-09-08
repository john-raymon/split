const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const config = require('config');
const findOrCreate = require("mongoose-find-or-create");

const SharedCardRecordSchema = new mongoose.Schema(
  {
    authorizedCardholder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ACUser",
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    cardToken: { type: String, index: true },
    sharing: { type: Boolean, default: true }
  },
  { timestamps: true }
);

SharedCardRecordSchema.plugin(findOrCreate);

SharedCardRecordSchema.methods.serialize = function() {
  return {
    cardToken: this.id,
    authorizedCardholder: this.authorizedCardholder.serialize(),
    cardOwner: this.user.serialize(),
  };
};

const SharedCardRecord = mongoose.model("SharedCardRecord", SharedCardRecordSchema);

module.exports = SharedCardRecord;
