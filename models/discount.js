const mongoose = require('mongoose');
const DiscountSchema = new mongoose.Schema({
    invoisediscountPrice: {
        type: Number,
        required: true
    },
    discountype: { type: String },
    amount: { type: Number, default: 0 },
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

    active: { type: Boolean, default: true }
}

    , {
        timestamps: true
    });
const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = Discount;
