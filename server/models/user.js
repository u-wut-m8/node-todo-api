const mongoose = require('mongoose');

var User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  }
});

module.exports = {User};
