const mongoose = require('mongoose');

var ProgramSchema = new mongoose.Schema({
    name: {
      type: String,
      default: String,
      required: true
    },
    code: {
      type: String,
      default: String
    }
});


module.exports = mongoose.model('Program', ProgramSchema);
