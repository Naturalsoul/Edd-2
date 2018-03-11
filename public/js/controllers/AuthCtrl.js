angular.module("AuthCtrl", ['cp.ngConfirm']).controller("AuthController", ["$scope", "$location", "$ngConfirm", "AuthService", function ($scope, $location, $ngConfirm, AuthService) {
    $scope.email = ""
    $scope.password = ""
    
    $scope.sign = {
        email: "",
        pass: "",
        pass2: ""
    }
    
    AuthService.isLoggedIn(function (res) {
        if (res.logged) {
            $location.path("/dashboard")
        }
    })

    $scope.login = function () {
        AuthService.login($scope.email, $scope.password, function (res) {
            if (res.logged) {
                $location.path("/dashboard")
            } else {
                $ngConfirm({
                    title: "Datos Invalidos",
                    content: "El correo electrónico y/o la contraseña son incorrectos.",
                    theme: "dark",
                    scope: $scope,
                    buttons: {
                        entendido: {
                            text: "Entendido",
                            btnClass: "btn btn-login",
                            action: function () {
                            }
                        }
                    }
                })
            }
        })
    }
    
    $scope.signup = function () {
        if ($scope.sign.email && $scope.sign.pass && $scope.sign.pass2) {
            if ($scope.sign.pass == $scope.sign.pass2) {
                AuthService.signup($scope.sign.email, $scope.sign.pass, function (res) {
                    if (res.registered) {
                        $scope.sign = {
                            email: "",
                            pass: ""
                        }
                        
                        $("#signUpModal").modal("hide")
                        
                        $ngConfirm({
                            title: "Usuario Registrado",
                            content: "Ya puede ingresar al sistema con sus credenciales de acceso.",
                            theme: "dark",
                            scope: $scope,
                            buttons: {
                                entendido: {
                                    text: "Entendido",
                                    btnClass: "btn btn-login",
                                    action: function () {
                                    }
                                }
                            }
                        })
                    } else {
                        $ngConfirm({
                            title: "Ocurrió un error en el proceso",
                            content: "Ocurrió un error al registrar su usuario. Asegúrece que su Correo Electrónico no esté ya inscrito o inténtelo de nuevo más tarde.",
                            theme: "dark",
                            scope: $scope,
                            buttons: {
                                entendido: {
                                    text: "Entendido",
                                    btnClass: "btn btn-login",
                                    action: function () {
                                    }
                                }
                            }
                        })
                    }
                })
            } else {
                $ngConfirm({
                    title: "Datos Invalidos",
                    content: "Las contraseñas no coinciden.",
                    theme: "dark",
                    scope: $scope,
                    buttons: {
                        entendido: {
                            text: "Entendido",
                            btnClass: "btn btn-login",
                            action: function () {
                            }
                        }
                    }
                })
            }
        } else {
            $ngConfirm({
                title: "Datos Incompletos",
                content: "Debe ingresar todos los datos que se le solicitan.",
                theme: "dark",
                scope: $scope,
                buttons: {
                    entendido: {
                        text: "Entendido",
                        btnClass: "btn btn-login",
                        action: function () {
                        }
                    }
                }
            })
        }
    }
    
    $scope.goHome = function () {
        $location.path("/")
    }
}])