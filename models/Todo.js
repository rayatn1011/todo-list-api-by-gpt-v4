const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mainMessage: {
    type: String,
    required: true,
  },
  subMessage: String,
  order: Number,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  lastToggled: Date,
});

module.exports = mongoose.model('Todo', todoSchema);
