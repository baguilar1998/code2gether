const mongoose = require('mongoose');

var Lobby = new mongoose.Schema({
    accountID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },

    subFiles: {
        type: Schema.Types.ObjectId,
        ref: 'Subfiles',
    },

    language: {
        type:String,
        default:String,
        required: true
    },

});

module.exports = mongoose.model('Lobby', UserSchema, 'lobies');