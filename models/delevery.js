const mongoose = require('mongoose');
const DeliverySchema = new mongoose.Schema({
    deliveryname: { type: String, require },
    deliverynumber: { type: String, require },
    invoice: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
        customername : {type:String},
        location: { type: String },
        phoneNumber: { type: String },
        progress : {type:String},
        finishdate : {type:String}
    }],
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
const Delevery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delevery;
