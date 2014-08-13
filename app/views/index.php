<!DOCTYPE html>
<html ng-app="ngApp" ng-strict-di>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title ng-bind="pageTitle + ' | Skill Map'"></title>
    <!-- inject:css -->
    <link rel="stylesheet" href="build/style/app.css">
    <link rel="stylesheet" href="build/style/simple-line-icons.css">
    <link rel="stylesheet" href="build/style/style.css">
    <!-- endinject -->

    <!-- inject:js -->
    <script src="build/vendor/jquery.js"></script>
    <script src="build/vendor/angular.js"></script>
    <script src="build/vendor/ui-router.js"></script>
    <script src="build/vendor/lodash.js"></script>
    <script src="build/vendor/restangular.js"></script>
    <script src="build/vendor/angular-resource.js"></script>
    <script src="build/vendor/angular-sanitize.js"></script>
    <script src="build/src/app/app.js"></script>
    <script src="build/src/app/controllers/home.controller.js"></script>
    <script src="build/src/app/controllers/login.controller.js"></script>
    <script src="build/src/app/controllers/test.controller.js"></script>
    <script src="build/src/app/directives/ui.js"></script>
    <script src="build/src/app/services/Authenticate.js"></script>
    <script src="build/src/app/services/Skill.js"></script>
    <script src="build/src/templates.js"></script>
    <!-- endinject -->
  </head>

  <body>
    <div class="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed}" ui-view></div>
  </body>

</html>