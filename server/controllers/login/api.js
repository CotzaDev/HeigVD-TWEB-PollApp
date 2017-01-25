"use strict";
var user_1 = require("../../models/user");
var jwt = require("jsonwebtoken");
var jwtKey = "Ag93Y6jPRZQ2nAY94GcnNuh";
var jwtPayload = (function () {
    function jwtPayload(username, issue_date) {
        this.username = username;
        this.issue_date = issue_date;
    }
    return jwtPayload;
}());
var Login = (function () {
    function Login() {
    }
    Login.prototype.register = function (req, res) {
        var emailRe = /\S+@\S+\.\S+/;
        if (!req.body.username || !req.body.email || !req.body.password ||
            req.body.password.length < 6 || req.body.username.length < 4 ||
            !emailRe.test(req.body.email)) {
            return res.status(422).send("Invalid or missing user data");
        }
        var newUser = new user_1.User(req.body);
        newUser.hashPsw();
        newUser.save()
            .then(function () {
            var payload = new jwtPayload(newUser.username, new Date());
            var token = jwt.sign(payload, jwtKey);
            res.json({ "status": "ok", "token": token });
        })
            .catch(function (err) {
            if (err.name === "MongoError" && err.message.indexOf("E11000 duplicate key") != -1) {
                res.status(422).send("This username or email is not available");
            }
            else {
                console.log(err.message);
                res.status(500).send("An error occured during the creation");
            }
        });
    };
    Login.prototype.login = function (req, res) {
        if (!req.body.username || !req.body.password) {
            return res.status(422).send("Missing credentials");
        }
        user_1.User.findOne(req.body.username)
            .then(function (user) {
            if (!user.checkPsw(req.body.password)) {
                return res.status(401).send("Wrong password");
            }
            var payload = new jwtPayload(user.username, new Date());
            var token = jwt.sign(payload, jwtKey);
            res.json({ "status": "ok", "token": token });
        })
            .catch(function () {
            return res.status(401).send("User not found");
        });
    };
    return Login;
}());
exports.Login = Login;
