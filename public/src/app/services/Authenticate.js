// @ngInject
function Authenticate(Restangular) {
	return Restangular.all('authentication');
}

angular.module('ngApp.Authenticate', [])
	.factory('Authenticate', Authenticate);