angular.module('edd-2', ['ngRoute',
                        'appRoutes',
                        'MainCtrl',
                        "AuthCtrl",
                        "AuthService"
                        ])

.run(["$rootScope", "$location", "AuthService", function ($rootScope, $location, AuthService) {
    $rootScope.$on("$routeChangeStart", function (e) {
        if ($location.path() == "/") {
            $(".display-none").css("display", "none")
        } else {
            $(".display-none").css("display", "block")
        }
        
        AuthService.isLoggedIn(function (logged) {
            if (!logged) {
                $location.path("/")
                $(".display-none").css("display", "none")
            }
        })
    })
}])