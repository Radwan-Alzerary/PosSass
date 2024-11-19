const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },

  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  expireDate: {
    type: Date,
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


  
  role: { type: String, defult: "user" },
  date: {
    type: Date,
    default: Date.now,
  },
  internetId: {
    type: String,
  },
});

// Hash the password and systemId before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  if (this.isModified('systemId')) {
    // this.systemId = await bcrypt.hash(this.systemId, 12);
  }
  next();
});
// Static method to login user using systemId and password
UserSchema.statics.loginWithSystemId = async function (systemId,email, password) {
  console.log(systemId)
  const user = await this.findOne({ systemId,email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log(user)
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect system ID');
};


const User = mongoose.model("User", UserSchema);

module.exports = User;
