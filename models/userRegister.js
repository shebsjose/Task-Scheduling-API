const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
      userName: {
        type: String,
        required: true,
        max: 255,
        min: 3,
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
module.exports = mongoose.model("User", registerSchema);