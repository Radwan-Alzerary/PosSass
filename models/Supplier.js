const mongoose = require("mongoose");
const SupplierSchema = new mongoose.Schema(
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

    purchasesInvoice: [
      {
        invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Supplier = mongoose.model("Supplier", SupplierSchema);

module.exports = Supplier;
