// @ngInject
function AppController() {
    this.name = 'Skill Map';
    this.production = 'build';
    this.version = '0.1.0';
    this.color = {
        primary:'#7266ba',
        info:'#23b7e5',
        success:'#27c24c',
        warning:'#fad733',
        danger:'#f05050',
        light:'#e8eff0',
        dark:'#3a3f51',
        black:'#1c2b36'
    };
    this.settings = {
        navbarHeaderColor:'bg-black',
        navbarCollapseColor:'bg-white-only',
        asideColor:'bg-black',
        headerFixed:true,
        asideFixed:false,
        asideFolded:false
    };
}

// @ngInject
function appConfig($urlRouterProvider, $stateProvider, RestangularProvider) {
    $urlRouterProvider.otherwise('/app/home');
    $stateProvider.state('app', {
        abstract: true,
        url: '/app',
        controller: 'AppController',
        controllerAs: 'app',
        templateUrl: 'app.html'
    });
    $stateProvider.state('access', {
        url: '/access',
        controller: 'AppController',
        controllerAs: 'access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
    });
    RestangularProvider.setBaseUrl('/skillmap/public/api');
}

// @ngInject
function routeConfig($rootScope, $location, Restangular, $timeout) {
    $rootScope.$on("$stateChangeStart", function(event, toState) {
        console.log('routeconfig: ');
        console.log(toState);
        if (toState.requiredLogin && !sessionStorage.authenticated) {
            $location.path('/access/login');
        }
    });
    $rootScope.showFlash = function(message) {
        $rootScope.flash = message;
        $timeout(function() {
            $rootScope.flash = '';
        }, 3000);
    };
    Restangular.setErrorInterceptor(function(response) {
        if (response.status == 401) {
            console.log("Login required... ");
            delete sessionStorage.authenticated;
            $rootScope.showFlash(response.data.flash);
            $location.path('/access/login');
        } else if (response.status == 404) {
            console.log("Resource not available...");
        } else {
            console.log("Response received with HTTP error code: " + response.status );
        }
        return false; // stop the promise chain
    });
}

var modules = [
    'templates',
    'ngApp.Authenticate',
    'ngApp.Skill',
    'ngApp.home',
    'ngApp.login',
    'ngApp.test',
    'ngApp.ui',
    'ui.router.state',
    'restangular',
    'ngSanitize'
];

angular.module('ngApp', modules)
    .controller('AppController', AppController)
    .config(appConfig)
    .run(routeConfig);