const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: "Todo must have content !"
    },
    finished: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: "Todo must have a userId registered !",
    }
  },
  { collection: 'Todos' }
);

module.exports = mongoose.model('Todos', todoSchema);