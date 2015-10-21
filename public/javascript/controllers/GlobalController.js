(function() {
  "use strict";
  angular.module('app')
  .controller('GlobalController', GlobalController);
  function GlobalController(UserFactory, $state) {
    var vm = this;
    vm.user = {};
    vm.status = UserFactory.status;

    vm.registerUser = function() {
      UserFactory.registerUser(vm.user).then(function() {
        $state.go('Home');
      });
    };

    vm.loginUser = function() {
      console.log("First Stop on Data flow journey");
      UserFactory.loginUser(vm.user).then(function() {
        $state.go('Home');
      });
    };

    vm.logout = function() {
      UserFactory.logout();
      $state.go('Login');
    };
  }
})();
