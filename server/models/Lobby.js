const mongoose = require('mongoose');

var  LobbySchema = new mongoose.Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    programFiles: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Lobby', LobbySchema);
