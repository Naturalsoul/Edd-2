var db = require("./../../config/db")

module.exports = db.model("Users", {
    email: String,
    pass: String,
    name: {type: String, default: ""},
    institution: {type: String, default: ""},
    region: {type: String, default: ""},
    comuna: {type: String, default: ""},
    city: {type: String, default: ""},
    uses: {type: Number, default: 0},
    creationDate: {type: Date, default: Date.now}
})