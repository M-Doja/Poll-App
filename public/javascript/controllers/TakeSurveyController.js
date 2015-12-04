(function() {
  "use strict";
  angular.module('app')
  .controller('TakeSurveyController', TakeSurveyController);
  function TakeSurveyController($stateParams, $state, HomeFactory) {
    var vm = this;
    vm.showResults = false;
    vm.selectedAnswer;
    vm.survey = {};

    if(!$stateParams.id) $state.go('Home');
    HomeFactory.getSurveyById($stateParams.id).then(function(res) {
      vm.survey = res;
      vm.showResults = vm.survey.userAnswered;
    });
console.log('take controller');
    vm.answerSurvey = function() {
      console.log($stateParams.id);
      HomeFactory.answerSurvey(vm.selectedAnswer, $stateParams.id).then(function(res) {
        for(var i = 0; i < vm.survey.answers.length; i++ ) {
          if(vm.survey.answers[i]._id === vm.selectedAnswer) {
            vm.survey.answers[i].answered.push(vm.selectedAnswer);
            break;
          }
        }
        vm.showResults = true;
        vm.selectedAnswer = null;
      });
    };
  }
})();
