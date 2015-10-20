(function() {
  "use strict";
  angular.module('app')
  .controller('CreateSurveyController', CreateSurveyController);
  function CreateSurveyController(HomeFactory, $state) {
    var vm = this;
    vm.survey = {};
    vm.survey.answers = [];

    vm.createSurvey = function() {
      HomeFactory.postSurvey(vm.survey).then(function(res) {
        $state.go('Home');
      }, function(res) {
        vm.survey = res;
        vm.message = "Please include at least 2 choices.";
      });
    };
  }
})();
