// models/Category.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    foods: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Food'
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
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

    comments: [CommentSchema]
}, {
    timestamps: true
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
