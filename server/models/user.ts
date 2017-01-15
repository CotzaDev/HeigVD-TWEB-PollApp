import * as mongoose from "mongoose";
import * as crypto from 'crypto';
import { IUser, IUserModel, Model } from './mongoose/user';

export class User {
  private schema: mongoose.Schema;
  private model: IUserModel;

  constructor(data?: IUser) {
    this.schema = new mongoose.Schema({
      username: { type: String, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true }
    });

    this.model = new Model();

    if(data) {
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
    }
  }

  public save(): Promise<void> {
    return this.model.save()
      .then((data: IUserModel) => {
        this.model = data;
        return Promise.resolve();
      })
      .catch((err: Error) => {
        return Promise.reject(err);
      });
  }

  public static findOne(username: string): Promise<User> {
    let result: User;

    return Model.findOne({"username": username})
      .then((data: IUser) => {
        if(data) {
          result = new User(data);
          return Promise.resolve(result);
        }
        return Promise.reject("No user found");
      });
  }

  public hashPsw(): void {
    this.password = crypto.createHash('sha1').update(this.password).digest('hex');
  }

  public checkPsw(password: string): Boolean {
    return this.password == crypto.createHash('sha1').update(password).digest('hex');
  }

  get id(): string {
    return this.model._id;
  }

  get username(): string {
    return this.model.username;
  }

  set username(value: string) {
    this.model.username = value;
  }

  get email(): string {
    return this.model.email;
  }

  set email(value: string) {
    this.model.email = value;
  }

  get password(): string {
    return this.model.password;
  }

  set password(value: string) {
    this.model.password = value;
  }
}
