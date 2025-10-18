const { default: mongoose, Schema } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 6,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
}); 


const User = mongoose.model("User" , userSchema); 
module.exports = User;
