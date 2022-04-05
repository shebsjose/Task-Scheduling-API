const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
      },
      user: {
        type: String,
        required: true,
      },
      taskStatus: {
        type: String,
        default: 'requested'
      },
});
module.exports = mongoose.model("Task", taskSchema); 