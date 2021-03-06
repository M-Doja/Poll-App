(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

		o.getAllSurveys = function() {
			var q = $q.defer();
			$http.get('/api/survey').then(function(res) {
				q.resolve(res.data);
				console.log(res.data);
			});
			return q.promise;
		};

		o.getSurveyById = function(id) {
			var q = $q.defer();
			$http.post('/api/survey/',{surveyId: id}, getAuth()).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.postSurvey = function(survey) {
			var q = $q.defer();
			var i = 0;
			while(i < survey.answers.length)
			{
				if(!survey.answers[i].choice) {
					survey.answers.splice(i, 1);
				}
				else i++;
			}
			if(survey.answers.length < 2) q.reject(survey);
			else {
				$http.post('/api/survey', survey, getAuth()).then(function(res) {
					q.resolve(res);
				});
			}
			return q.promise;
		};

		o.answerSurvey = function(answerId, surveyId) {
			var q = $q.defer();
			$http.put('/api/survey/' + surveyId + '/' + answerId, null, getAuth()).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		function getAuth() {
			return {
				headers: {
					Authorization: "Bearer " + localStorage.getItem('token')
				}
			};
		}

		return o;
	}
})();
