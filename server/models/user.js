"use strict";
var crypto = require("crypto");
var user_1 = require("./mongoose/user");
var group_1 = require("./group");
var User = (function () {
    function User(data, model) {
        this.model = new user_1.Model();
        if (model) {
            this.model = model;
        }
        else if (data) {
            this.username = data.username;
            this.email = data.email;
            this.password = data.password;
            this.model.groups = data.groups;
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
    User.prototype.addGroup = function (data) {
        var _this = this;
        var index = this.model.groups.push({});
        index--;
        var group = this.model.groups[index];
        group.name = data.name;
        group.questions = data.questions;
        return this.save()
            .then(function () {
            return Promise.resolve(new group_1.Group(_this, _this.groups[index]));
        });
    };
    User.prototype.findGroup = function (id) {
        var model = this.model.groups.id(id);
        return new group_1.Group(this, model);
    };
    User.findOne = function (username) {
        var result;
        return user_1.Model.findOne({ "username": username })
            .then(function (data) {
            if (data) {
                result = new User(null, data);
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
    Object.defineProperty(User.prototype, "groups", {
        get: function () {
            return this.model.groups;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.User = User;
