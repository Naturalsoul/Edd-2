let bcrypt = require("bcrypt-nodejs")
let Users = require("../models/users.model")

module.exports = {
    checkUser: function (userName, password, next) {
        Users.findOne({name: userName}, function (err, data) {
            if (err) {
                throw err
            }
            
            if (data != null) {
                console.log(password)
                
                bcrypt.compare(password, data.pass, function (err, data) {
                    if (err) {
                        throw err
                    }
                    
                    if (data) {
                        next(true)
                    } else {
                        next(false)
                    }
                })
            } else {
                next(false)
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
    
    signup: function (username, password, next) {
        let salt = bcrypt.genSaltSync(10);
        
        bcrypt.hash(password, salt, null, function (err, hash) {
            if (err) {
                throw err
            }
            
            let newUser = new Users({name: username, pass: hash})
            
            newUser.save()
            
            next({registered: true})
        })
    }
}