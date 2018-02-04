angular.module('AuthService', []).factory('AuthService', ['$http', "$location", function($http, $location) {
    return {
        find : function(userName, pass, next) {
            $http.post("/api/login", {
                userName: userName,
                password: pass
            }).then(function (data) {
                next(data.data)
            }, function (err) {
                console.log(err)
                alert([])
            })
        },
        
        isLoggedIn: function (next) {
            $http.get("/api/login/check")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err)
                    alert([])
                })
        },
        
        logout: function (next) {
            $http.get("/api/logout")
                .then(function (data) {
                    next(data.data.logged)
                }, function (err) {
                    console.log(err)
                    alert([])
                })
        },
        
        signup: function (username, pass, next) {
            $http.post("/api/signup", {username: username, pass: pass})
                .then(function (data) {
                    next(data.data)
                }, function (err) {
                    console.log(err)
                    next([])
                })
        }
    }
}]);