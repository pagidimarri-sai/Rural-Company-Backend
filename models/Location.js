const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  coordinates: {
    type: [Number], // [lat, lng]
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    enum: ['Home', 'Work', 'Other'],
    default: 'Other',
  },
}, { timestamps: true });

module.exports = mongoose.model('Location', locationSchema);
