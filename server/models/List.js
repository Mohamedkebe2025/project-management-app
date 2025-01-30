const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spaceId: {
    type: Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
});

module.exports = mongoose.model('List', listSchema);
