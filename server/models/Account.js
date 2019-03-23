const mongoose = require('mongoose');


var AccountSchema = new mongoose.Schema({
    accountID: {
      type:String,
      default:String,
      required: true
    },
    files: {
        type: Schema.Types.ObjectId,
        ref: 'File',
    },
    email: {
      type:String,
      default:String,
      required:true
    },
  });
  
  // Export the mongoose model
  module.exports = mongoose.model('Account', UserSchema, 'accounts');
  