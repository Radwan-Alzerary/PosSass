const mongoose = require("mongoose");
const paymentTypeSchema = new mongoose.Schema(
  {
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

  },
  {
    timestamps: true,
  }
);
const paymentType = mongoose.model("paymentType", paymentTypeSchema);

module.exports = paymentType;
