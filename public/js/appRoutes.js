angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    
        // home page
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })
        
        .when("/dashboard", {
            templateUrl: "views/dashboard.html",
            controller: "DashboardController"
        })
        
        .otherwise({
            redirectTo: "/"
        })
    
    $locationProvider.html5Mode(true);

}]);