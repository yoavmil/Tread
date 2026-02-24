const mongoose = require('mongoose');

const eraseSubmissionSchema = new mongoose.Schema({
  placeId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  reason:      { type: String, default: '' },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('EraseSubmission', eraseSubmissionSchema);
