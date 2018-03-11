angular.module("AuthCtrl", ['cp.ngConfirm']).controller("AuthController", ["$scope", "$location", "$ngConfirm", "AuthService", function ($scope, $location, $ngConfirm, AuthService) {
    $scope.email = ""
    $scope.password = ""
    
    $scope.sign = {
        email: "",
        pass: "",
        pass2: ""
    }
    
    AuthService.isLoggedIn(function (logged) {
        if (logged) {
            $location.path("/")
        }
    })

    $scope.login = function () {
        AuthService.find($scope.userName, $scope.password, function (res) {
            if (res.logged) {
                $location.path("/")
            } else {
                $ngConfirm({
                    title: "Que mal!",
                    content: "Datos invalidos.",
                    theme: "dark",
                    scope: $scope,
                    buttons: {
                        cerrar: {
                            text: "Aceptar",
                            btnClass: "btn btn-primary",
                            action: function () {
                            }
                        }
                    }
                })
            }
        })
    }
    
    $scope.signup = function () {
        AuthService.signup($scope.sign.email, $scope.sign.pass, function (res) {
            if (res) {
                $scope.sign = {
                    email: "",
                    pass: ""
                }
                
                $ngConfirm({
                    title: "Éxito!",
                    content: "El nuevo usuario fué creado éxitosamente.",
                    theme: "dark",
                    scope: $scope,
                    buttons: {
                        cerrar: {
                            text: "Aceptar",
                            btnClass: "btn btn-success",
                            action: function () {
                            }
                        }
                    }
                })
            } else {
                $ngConfirm({
                    title: "Que mal!",
                    content: "Ocurrió un error al registrar el nuevo usuario. Intente nuevamente con otro nombre de usuario.",
                    theme: "dark",
                    scope: $scope,
                    buttons: {
                        cerrar: {
                            text: "Aceptar",
                            btnClass: "btn btn-primary",
                            action: function () {
                            }
                        }
                    }
                })
            }
        })
    }
    
    $scope.goHome = function () {
        $location.path("/")
    }
}])