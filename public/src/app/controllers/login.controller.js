// @ngInject
function loginConfig($stateProvider) {
    $stateProvider.state('access.login', {
        url: '/login',
        controller: 'LoginController',
        controllerAs: 'login',
        templateUrl: 'login/index.html'
    });
}

// @ngInject
function LoginController($rootScope, Authenticate, $sanitize, $location) {
	var self = this;
    $rootScope.pageTitle = 'Login';
    this.login = function() {
    	Authenticate.post({
    		'email': $sanitize(self.email),
    		'password': $sanitize(self.password)
    	}).then(function() {
            $rootScope.flash = '';
    		$location.path('/app/home');
    		sessionStorage.authenticated = true;
    	}, function(response) {
    		$rootScope.showFlash(response.data.flash);
    	});
    };
}

angular.module('ngApp.login', ['ui.router.state'])
    .controller('LoginController', LoginController)
    .config(loginConfig);