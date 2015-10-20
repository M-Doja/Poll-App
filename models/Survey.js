var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema({
  topic: { required: true, type: String },
  created: Date,
  deleted: Date,
  createdBy: { required: true, type: String },
  answers: [{
    choice: { required: true, type: String },
    numAnswered: { default: 0, type: Number }
  }]
});

mongoose.model('Survey', SurveySchema);
