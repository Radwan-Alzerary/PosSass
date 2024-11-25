// models/Food.js

const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        priceCurrency: {
            type: String,
            default: 'iqd',
        },
        image: {
            url: { type: String },
        },
        active: {
            type: Boolean,
            default: true,
        },
        manualBarcode: { type: String },
        unit: { type: String, default: '' },
        unlimit: {
            type: Boolean,
            default: true,
        },
        quantety: {
            type: Number,
            default: 0,
        },
        barcode: { type: String },
        addeduse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        cost: {
            type: Number,
            default: 0,
        },
        costCurrency: {
            type: String,
            default: 'iqd',
        },
        discount: {
            type: Number,
            default: 0,
        },
        storge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'storge',
        },
        expireDate: {
            type: Date,
        },
        printable: {
            type: Boolean,
            default: true,
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
    
        // Exclude isOnlineSync since it's only needed on the client side
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Food', FoodSchema);
