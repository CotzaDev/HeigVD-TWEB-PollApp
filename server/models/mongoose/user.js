"use strict";
var mongoose = require("mongoose");
var UserModel;
(function (UserModel) {
    ;
    var userSchema = new mongoose.Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true }
    });
    UserModel.Model = mongoose.model("User", userSchema);
})(UserModel || (UserModel = {}));
module.exports = UserModel;
