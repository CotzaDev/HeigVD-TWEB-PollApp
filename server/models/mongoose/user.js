"use strict";
var mongoose = require("mongoose");
var group_1 = require("./group");
var UserModel;
(function (UserModel) {
    ;
    var userSchema = new mongoose.Schema({
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        groups: [group_1.groupSchema]
    });
    UserModel.Model = mongoose.model("User", userSchema);
})(UserModel || (UserModel = {}));
module.exports = UserModel;
