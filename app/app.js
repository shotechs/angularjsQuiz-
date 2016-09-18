'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('QuizApp', [
  'ngRoute',
  'ui.bootstrap',
  'QuizApp.home',
  'QuizApp.view2',
  'QuizApp.version'
]).

directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
				
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				
				
				scope.question =[];
				
					scope.options=[];
					scope.answer=[];
					scope.answerMode= null;
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					
				//console.log(q.dec);
					scope.question.push( 
					q.dec
					
					);
					
					angular.forEach(q.choose, function(value, key) {
						scope.options.push(value
				);
//  console.log(key + ': ' + value);
});
				
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').map(function() {
    return this.value;
}) .get().join(", ");


				//console.log(ans);
				
				//console.log(scope.answer);
				
				
				
				if(ans == scope.answer) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
})



.factory('quizFactory', function($http) {
	var questions = [];
	var title = null;
	$http.get('quiz.json')
        .success(function(data) {
			
				angular.forEach(data, function(value, key) {
						questions.push(value);
  //console.log(key + ': ' + value);
 //console.log( value.dec);
});

questions.shift();
questions.shift();
            //questions=data.question;
			
			
			title=data.title;
			//console.log(questions[0].dec);
			//console.log(questions.length);
			
        })
        .error(function(data,status,error,config){
            questions = [{heading:"Error",description:"Could not load json data"}];
        });
	
 
	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
}).







config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
