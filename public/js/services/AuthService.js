angular.module('AuthService', []).factory('AuthService', ['$http', "$location", function($http, $location) {
    return {
        find : function(userName, pass) {
            $http.post("/api/login", {
                userName: userName,
                password: pass
            }).then(function (data) {
                if (data.data.logged) {
                    $location.path("/")
                } else {
                    alert("Datos invalidos.")
                }
            }, function (err) {
                console.log(err)
                alert(err.toString())
            })
        },
        
        isLoggedIn: function (next) {
            $http.get("/api/login/check")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err)
                    alert(err.toString())
                })
        },
        
        logout: function (next) {
            $http.get("/api/logout")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err)
                    alert(err.toString())
                })
        }
    }
}]);