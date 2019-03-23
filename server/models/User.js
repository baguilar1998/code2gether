// Import the mongoose library
const mongoose = require('mongoose');

/**
 * Create a variable for the model
 * Format: MODEL_NAMESchema
 * Each required information that is needed
 * will be represented as a Javascript object
 *
 * Format:
 * attribute_name: {
 *  type: the type of data that will be contained,
 *  default: set the default type if its not defined,
 *  required: BOOLEAN VALUE: if the data item is required or not
 * }
 *
 * To refer to another mongoose model as your type, insert the follow
 * attributes in your Javascript object
 * attribute_name: {
 *  type: Schema.Types.ObjectId,
    ref: MONGOOSE TYPE,
 * }
 */
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
  email: {
    type:String,
    default:String,
    required:true
  },
  password: {
    type:String,
    default:String,
    required:true
  },
});

// Export the mongoose model
module.exports = mongoose.model('User', UserSchema, 'users');
