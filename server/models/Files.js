const mongoose = require('mongoose');

var Files = new mongoose.Schema({
    accountID: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    }
});

module.exports = mongoose.model('File', UserSchema, 'files');