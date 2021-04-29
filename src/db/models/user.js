const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model("User", {
  first_name: {
    type: String,
    required: [true, "First Name required!"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Invalid First Name. No numbers!");
      }
    },
  },
  last_name: {
    type: String,
    required: [true, "Last Name required!"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isAlpha(value)) {
        throw new Error("Invalid First Name. No numbers!");
      }
    },
  },
  unit: {
    type: String,
    required: [true, "Unit Name Required"]
  },
  email: {
    type: String,
    required: [true, "You must enter an email."],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
    },
  },
  password: {
    type: String,
    required: [true, 'You must enter a password'],
    minLength: [7, "Password must be greater than 6 characters"],
    validate(value){
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not include the word "password"')
      }
    },
    trim: true,
  }
});

module.exports = User;