const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    immutable: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    immutable: true,
    required: true,
  },
  authority: {
    type: [String],
    required: false,
  },
  admin: {
    type: Boolean,
    immutable: true,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now(),
  },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
