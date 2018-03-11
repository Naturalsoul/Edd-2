let bcrypt = require("bcrypt-nodejs")
let Users = require("../models/users.model")

module.exports = {
    login: function (email, password, next) {
        Users.findOne({email: email}, function (err, data) {
            if (err) {
                next({logged: false})
            }
            
            if (data != null) {
                bcrypt.compare(password, data.pass, function (err, data) {
                    if (err) {
                        next({logged: false})
                    }
                    
                    if (data) {
                        next({logged: true})
                    } else {
                        next({logged: false})
                    }
                })
            } else {
                next({logged: false})
            }
        })
    },
    
    isLogged: function (session, next) {
        if (session.logged) {
            next({logged: true})
        } else {
            next({logged: false})
        }
    },
    
    signup: function (email, password, next) {
        Users.count({email: email}, function (err, c) {
            if (err) next({registered: false})
            
            if (c > 0) next({registered: false})
            else {
                let salt = bcrypt.genSaltSync(10);
                
                bcrypt.hash(password, salt, null, function (err, hash) {
                    if (err) {
                        next({registered: false})
                    }
                    
                    let newUser = new Users({email: email, pass: hash})
                    
                    newUser.save()
                    
                    next({registered: true})
                })
            }
        })
    }
}