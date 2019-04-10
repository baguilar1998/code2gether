// Import the mongoose library
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: {
    type:String,
    default:String,
    required: true
  },
  lastName: {
    type:String,
    default:String,
    required:true
  },
  username: {
    type:String,
    default: String,
    required: true
  },
  email: {
    type:String,
    default:String,
    required:true
  },
  projects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  password: {
    type:String,
    default:String,
    required:true
  },
});

module.exports = mongoose.model('User', UserSchema);
