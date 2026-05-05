const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    sender:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message:  { type: String, default: '' },
    status:   {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// One active request per pair (no duplicates)
requestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model('Request', requestSchema);