const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
