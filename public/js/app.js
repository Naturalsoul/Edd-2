angular.module('edd-2', ['ngRoute',
                        'appRoutes',
                        'MainCtrl',
                        "AuthCtrl",
                        "AuthService"
                        ])

.run(["$rootScope", "$location", "AuthService", function ($rootScope, $location, AuthService) {
    $rootScope.$on("$routeChangeStart", function (e) {
        if ($location.path() == "/login") {
            $("#navbar-top").hide()
            $("#login").hide()
        } else {
            $("#navbar-top").show()
            $("#login").hide()
        }
        
        AuthService.isLoggedIn(function (logged) {
            if (!logged) {
                $("#navbar-top").hide()
                $("#login").show()
            }
        })
    })
}])