const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: "User must have a username !"
    },
    password: {
      type: String,
      required: "User must have a password !"
    },
    email: {
      type: String,
      required: "User must have an email !"
    }
  },
  { collection: 'Users' }
);

module.exports = mongoose.model('Users', userSchema);