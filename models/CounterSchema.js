// models/Counter.js

const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store date as 'YYYY-MM-DD'
  count: { type: Number, default: 1 },
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

});

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = Counter;
