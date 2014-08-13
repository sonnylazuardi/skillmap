// @ngInject
function Skill(Restangular) {
	return Restangular.all('skills');
}

angular.module('ngApp.Skill', [])
	.factory('Skill', Skill);