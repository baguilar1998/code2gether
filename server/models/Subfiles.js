const mongoose = require('mongoose');

var SubfilesSchema = new mongoose.Schema({
    type: string,
    default: string,
});


module.exports = mongoose.model('Subfiles', UserSchema, 'subfiles');