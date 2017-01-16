"use strict";
var mongoose = require("mongoose");
var crypto = require("crypto");
var user_1 = require("./mongoose/user");
var User = (function () {
    function User(data) {
        this.schema = new mongoose.Schema({
            username: { type: String, unique: true, required: true },
            email: { type: String, unique: true, required: true },
            password: { type: String, required: true }
        });
        this.model = new user_1.Model();
        if (data) {
            this.username = data.username;
            this.email = data.email;
            this.password = data.password;
        }
    }
    User.prototype.save = function () {
        var _this = this;
        return this.model.save()
            .then(function (data) {
            _this.model = data;
            return Promise.resolve();
        })
            .catch(function (err) {
            return Promise.reject(err);
        });
    };
    User.findOne = function (username) {
        var result;
        return user_1.Model.findOne({ "username": username })
            .then(function (data) {
            if (data) {
                result = new User(data);
                return Promise.resolve(result);
            }
            return Promise.reject("No user found");
        });
    };
    User.prototype.hashPsw = function () {
        this.password = crypto.createHash('sha1').update(this.password).digest('hex');
    };
    User.prototype.checkPsw = function (password) {
        return this.password == crypto.createHash('sha1').update(password).digest('hex');
    };
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this.model._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this.model.username;
        },
        set: function (value) {
            this.model.username = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this.model.email;
        },
        set: function (value) {
            this.model.email = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this.model.password;
        },
        set: function (value) {
            this.model.password = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
