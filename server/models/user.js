const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const _ = require("lodash");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    unique: true,
    validate: {
      validator: (value) => {                                                 //validator: validator.isEmail
        return validator.isEmail(value);
      },
      message: `{VALUE} is not a valid email.`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {                                             //Override default toJSON()
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
}

UserSchema.methods.generateAuthToken = function () {                                  //User defined generateAuthToken()
  var user = this;
  var access = "auth";
  var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model("User", UserSchema);

module.exports = {User};
