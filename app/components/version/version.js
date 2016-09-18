'use strict';

angular.module('QuizApp.version', [
  'QuizApp.version.interpolate-filter',
  'QuizApp.version.version-directive'
])

.value('version', '0.1');
