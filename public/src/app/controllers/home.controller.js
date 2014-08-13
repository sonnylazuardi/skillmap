// @ngInject
function homeConfig($stateProvider) {
    $stateProvider.state('app.home', {
        url: '/home',
        controller: 'HomeController',
        controllerAs: 'home',
        templateUrl: 'home/index.html', 
        requiredLogin: true
    });
}

// @ngInject
function HomeController($rootScope, Authenticate, Skill, $location) {
    var self = this;
    self.skills = Skill.getList().$object;
    this.logout = function() {
        Authenticate.customGET('').then(function(result) {
            delete sessionStorage.authenticated;
            $location.path('/access/login');
        });
    };
    $rootScope.pageTitle = 'Hello';
}

angular.module('ngApp.home', ['ui.router.state'])
    .controller('HomeController', HomeController)
    .config(homeConfig);