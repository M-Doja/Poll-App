(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('CreateSurvey', {
			url: '/Survey/Create',
			templateUrl: 'views/createSurvey.html'
		}).state('TakeSurvey',{
			url: '/Survey/Answer/:id',
			templateUrl: 'views/takeSurvey.html'
		}).state('Login', {
			url: '/login',
			templateUrl: 'views/login.html'
		}).state('Register', {
			url: '/register',
			templateUrl: 'views/register.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
