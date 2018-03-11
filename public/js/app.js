angular.module('edd-2', ['ngRoute',
                        'appRoutes',
                        'MainCtrl',
                        "AuthCtrl",
                        "DashboardCtrl",
                        "AuthService",
                        "DashboardService"
                        ])

.run(["$rootScope", "$location", "AuthService", function ($rootScope, $location, AuthService) {
    $rootScope.$on("$routeChangeStart", function (e) {
        if ($location.path() == "/") {
            $(".display-none").css("display", "none")
            $(".checkForResponsive").removeClass("col-sm-11")
        } else {
            $(".display-none").css("display", "block")
            $(".display-none").animateCss("fadeIn")
        }
        
        AuthService.isLoggedIn(function (logged) {
            if (!logged) {
                $location.path("/")
                $(".display-none").css("display", "none")
            }
        })
    })
}])