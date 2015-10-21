var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema({
  topic: { required: true, type: String },
  created: Date,
  deleted: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [{
    choice: { required: true, type: String },
    answered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }]
  }]
});

mongoose.model('Survey', SurveySchema);
