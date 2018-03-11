angular.module('AuthService', []).factory('AuthService', ['$http', "$location", function($http, $location) {
    return {
        login: function(email, pass, next) {
            $http.post("/api/login", {
                email: email,
                password: pass
            }).then(function (data) {
                next(data.data)
            }, function (err) {
                console.log(err.data)
                alert([])
            })
        },
        
        isLoggedIn: function (next) {
            $http.get("/api/login/check")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err.data)
                    alert([])
                })
        },
        
        logout: function (next) {
            $http.get("/api/logout")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err.data)
                    alert([])
                })
        },
        
        signup: function (email, pass, next) {
            $http.post("/api/signup", {email: email, pass: pass})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err.data)
                    next([])
                })
        }
    }
}]);