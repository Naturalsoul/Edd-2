angular.module("MainCtrl", []).controller("MainController", ["$scope", "$location", "AuthService", function ($scope, $location, AuthService) {
    $scope.logout = function () {
        AuthService.logout(function (logged) {
            $location.path("/login")
        })
    }
}])