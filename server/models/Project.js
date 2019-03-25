const mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
      type:String,
      deafult: String,
      required: true
    },
    editors: {
      type: Array,
      default: []
    },
    maxUsers: {
      type: Number,
      default: Number,
      min:1,
      max:5
    },
    language: {
      type: String,
      default: String,
      required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
