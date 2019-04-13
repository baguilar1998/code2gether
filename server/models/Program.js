const mongoose = require('mongoose');

var ProgramSchema = new mongoose.Schema({
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      requried: true
    },
    name: {
      type: String,
      default: String,
      required: true
    },
    code: {
      type: String,
      default: String,
    }
});


module.exports = mongoose.model('Program', ProgramSchema);
