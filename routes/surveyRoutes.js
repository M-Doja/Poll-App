var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');
var jwt = require('express-jwt');
// this how server knows if user is legit or not
var auth = jwt({
  secret: 'HashBrowns',
  userProperty: 'payload'
});

router.param('id', function(req, res, next, id) {
  Survey.findOne({_id: id}, function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not find the survey with an id of: " + id);
    req.survey = result;
    next();
  });
});

router.get('/', function(req, res, next) {
    Survey
    .find({})
    .select('topic createdBy')
    .populate('createdBy', 'username')
    .exec(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

router.get('/:id', auth, function(req, res) {
var found = false;
for(var i = 0; i < req.survey.answers.length; i++ ) {
  if(req.survey.answers[i].answered.some(function(elem, indx, array) {
    return elem == req.payload._id;
    console.log(req.payload._id);
  })) {
    found = true;
    break;
  }
}
  res.send(req.survey);
});

router.post('/', auth, function(req, res, next) {
  var survey = new Survey(req.body);
  survey.createdBy = req.payload._id;
  survey.created = new Date();
  survey.deleted = null;
  survey.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not create the object. Please check all fields.");
    res.send(result);
  });
});

router.put('/:id/:answerId', auth, function(req, res, next) {
  var found = false;
  for(var i = 0; i < req.survey.answers.length; i++ ) {
    if(req.survey.answers[i].answered.some(function(elem, indx, array) {
      return elem == req.payload._id;
    }))
     {
      found = true;
      break;
    }
  }
  if(found) return next("Could not find an answer in survey: " + req.survey.topic + "\nwith an answer id of: " + req.params.answerId);
  for(var i = 0; i < req.survey.answers.length; i++ ){
    if(req.survey.answers[i]._id == req.params.answerId){
      req.survey.answer[i].answered.push(req.payload._id);
    }
  }
  req.survey.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next("There was no result in the put /:id/:answerId save function, in the surveyRoutes.js file.");
    res.send(result);
  });
});

module.exports = router;
