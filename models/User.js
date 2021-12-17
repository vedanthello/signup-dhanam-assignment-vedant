const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },    
  }, 
  {
    timestamps: true
  } 
);

module.exports = model("users", UserSchema);