// @ngInject
function testConfig($stateProvider) {
    $stateProvider.state('app.test', {
        url: '/test',
        controller: 'TestController',
        controllerAs: 'test',
        templateUrl: 'test/index.html', 
        requiredLogin: true
    });
}

// @ngInject
function TestController($rootScope, Authenticate, Skill, $location) {
    $rootScope.pageTitle = 'Test';
}

angular.module('ngApp.test', ['ui.router.state'])
    .controller('TestController', TestController)
    .config(testConfig);