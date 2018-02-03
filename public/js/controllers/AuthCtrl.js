angular.module("AuthCtrl", []).controller("AuthController", ["$scope", "$location", "AuthService", function ($scope, $location, AuthService) {
    $scope.userName = ""
    $scope.password = ""
    
    AuthService.isLoggedIn(function (logged) {
        if (logged) {
            $location.path("/")
        }
    })

    $scope.login = function () {
        AuthService.find($scope.userName, $scope.password)
    }
}])