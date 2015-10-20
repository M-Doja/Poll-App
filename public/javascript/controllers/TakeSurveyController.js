
(function() {
"use strict";
angular.module('app')
.controller('TakeSurveyController', TakeSurveyController);
function TakeSurveyController($stateParams, $state, HomeFactory) {
var vm = this;
vm.showResults = false;
vm.selectedAnswer;

if(!$stateParams.id) $state.go('Home');
HomeFactory.getSurveyById($stateParams.id).then(function(res) {
  console.log(res);
 vm.survey = res;
});

vm.answerSurvey = function() {
 HomeFactory.answerSurvey(vm.selectedAnswer, $stateParams.id).then(function(res) {
   for(var i = 0; i < vm.survey.answers.length; i++ ) {
     if(vm.survey.answers[i]._id === vm.selectedAnswer) {
       vm.survey.answers[i].numAnswered += 1;
       break;
     }
   }
   vm.showResults = true;
   vm.selectedAnswer = null;
 });
};
}
})();
