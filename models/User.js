const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  nickname: {
    type: String,
    unique: true,
    required: true,
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
