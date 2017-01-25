import * as crypto from 'crypto';
import { IUser, IUserModel, Model } from './mongoose/user';
import { IGroup, IGroupModel } from './mongoose/group';
import { Group } from './group';
import { Room } from './room';

export class User {
  public model: IUserModel;
  public room: Room;
  public socket: SocketIO.Socket;

  constructor(data?: IUser, model?: IUserModel) {
    this.model = new Model();

    if(model) {
      this.model = model;
    }
    else if(data) {
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;

      this.model.groups = data.groups;
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

  public addGroup(data: IGroup): Promise<Group> {
    let index = this.model.groups.push({} as IGroup);
    index--;
    let group: IGroup = this.model.groups[index];

    group.name = data.name;
    group.questions = data.questions;

    return this.save()
      .then(() => {
        return Promise.resolve(new Group(this, <IGroupModel>this.groups[index]));
      });
  }

  public findGroup(id: string): Group {
    let model: IGroupModel = this.model.groups.id(id);
    return new Group(this, model);
  }

  public static findOne(username: string): Promise<User> {
    let result: User;

    return Model.findOne({"username": username})
      .then((data: IUserModel) => {
        if(data) {
          result = new User(null, data);
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

  get groups(): [IGroup] {
    return this.model.groups;
  }
}
