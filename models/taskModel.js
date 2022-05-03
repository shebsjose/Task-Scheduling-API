
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
      time :{
        type : String
      }
}, { timestamps: true});
module.exports = mongoose.model("Task", taskSchema); 