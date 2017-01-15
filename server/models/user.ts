import * as mongoose from "mongoose";

interface IUser{
  username: String,
  email: String,
  password: String
}

interface IUserModel extends IUser, mongoose.Document{};

export class User {
  private schema: mongoose.Schema;
  private model: mongoose.Model<IUserModel>;

  constructor() {
    this.schema = new mongoose.Schema({
      username: String,
      email: String,
      password: String
    });

    this.model = mongoose.model<IUserModel>("User", this.schema);
  }

  public save(): Promise<mongoose.MongooseDocument> {
    return this.model.create();
  }

  get username(): String {
    return this.schema.get('username');
  }

  set username(value: String) {
    this.schema.set('username', value);
  }

  get email(): String {
    return this.schema.get('email');
  }

  set email(value: String) {
    this.schema.set('email', value);
  }

  get password(): String {
    return this.schema.get('password');
  }

  set password(value: String) {
    this.schema.set('password', value);
  }
}
