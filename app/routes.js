// ------------------ Controllers

var Users = require("./controllers/users.controller")

// ------------------

module.exports = function (app) {
    
    /* 
     * --------------------------------------------------------------------------
     * Access
     * --------------------------------------------------------------------------
     */
    
    app.get("/api/login/check", function (req, res) {
        Users.isLogged(req.session, function (results) {
            res.json(results)
        })
    })
    
    app.post("/api/login", function (req, res) {
        Users.checkUser(req.body.userName, req.body.password, function (results) {
            if (results) {
                req.session.logged = true
                res.json({logged: true})
            } else {
                res.json({logged: false})
            }
        })
    })
    
    app.post("/api/signup", function(req, res) {
        Users.signup(req.body.username, req.body.pass, function (results) {
            res.json(results)
        })
    })
    
    app.get("/api/logout", function (req, res) {
        delete req.session.logged
        res.json({logged: false})
    })
    
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}