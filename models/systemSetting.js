const mongoose = require("mongoose");
const systemSettingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: "casher",
    },
    specialId: {
      type: String,
      required: true,
      unique: true,
    },

    license: {
      type: String,
    },
    telegramBotId: {
      type: String,
      default: "",
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

  },
  {
    timestamps: true,
  }
);
const systemSetting = mongoose.model("systemSetting", systemSettingSchema);

module.exports = systemSetting;
