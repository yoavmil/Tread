const mongoose = require('mongoose');

const editSubmissionSchema = new mongoose.Schema({
  placeId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  before:      { type: mongoose.Schema.Types.Mixed, required: true },
  after:       { type: mongoose.Schema.Types.Mixed, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('EditSubmission', editSubmissionSchema);
