const mongoose = require('mongoose');
const storgeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    offlineSync: {
        isOfflineSync: {
            type: Boolean,
            default: false,
        },
        offlineSyncDate: {
            type: Date,
        },
    },
    systemId: {
        type: String,
        required: true,
        },

}, {
    timestamps: true
});
const storge = mongoose.model('storge', storgeSchema);

module.exports = storge;
