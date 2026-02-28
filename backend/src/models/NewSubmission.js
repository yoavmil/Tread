const mongoose = require('mongoose');

const newSubmissionSchema = new mongoose.Schema({
  placeData:   { type: mongoose.Schema.Types.Mixed, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('NewSubmission', newSubmissionSchema);
