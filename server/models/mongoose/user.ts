import * as mongoose from "mongoose";

module UserModel {
  export interface IUser {
    username: string,
    email: string,
    password: string
  }

  export interface IUserModel extends IUser, mongoose.Document{};

  var userSchema: mongoose.Schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  });

  export var Model: mongoose.Model<IUserModel>;
  Model = mongoose.model<IUserModel>("User", userSchema);
}

export = UserModel;
