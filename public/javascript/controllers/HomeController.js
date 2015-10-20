(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;

		HomeFactory.getAllSurveys().then(function(res) {
			vm.surveys = res;
		});
	}
})();
