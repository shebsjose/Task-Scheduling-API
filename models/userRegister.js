const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
      usename: {
        type: String,
        required: true,
        max: 255,
        min: 6,
      },
      email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
      },
      password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
      },
});
module.exports = mongoose.model("Register", registerSchema);