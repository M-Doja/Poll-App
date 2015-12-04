(function() {
  "use strict";
  angular.module('app')
  .controller('ProfileController', ProfileController);
  function ProfileController($stateParams, UserFactory) {
    var vm = this;
    vm.surveyarray = {};

// As soon as controller loads, vm.profile will load with surveys.
        console.log($stateParams.id);
        console.log($stateParams.username);
      UserFactory.getSurveyByUser($stateParams.id).then(function(res){
        console.log(res);
        vm.survey = res;
      });



  }
})();
