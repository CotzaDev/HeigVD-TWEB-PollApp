import { IUserModel } from './mongoose/user';
import { IGroup } from './mongoose/group';
import { IQuestion } from './mongoose/question';
import { User } from './user';

export class Group {
  private model: IUserModel;
  private group: IGroup;
  public user: User;

  constructor(data?: IGroup) {

    if(data) {
      this.model.isNew = false;

      this.name = data.name;
      this.questions = data.questions;

      if((<any>data)._id) {
        (<any>this.group)._id = (<any>data)._id;
      }
    }
  }

  public save(): Promise<void> {
    return this.model.save()
      .then(() => {
        return Promise.resolve();
      })
      .catch((err: Error) => {
        return Promise.reject(err);
      });
  }

  /*public static findById(id: string): Group {
    return Model.findOne({"username": username})
      .then((data: IUser) => {
        if(data) {
          result = new User(data);
          return Promise.resolve(result);
        }
        return Promise.reject("No user found");
      });
  }*/

  get id(): string {
    return this.group.id;
  }

  get name(): string {
    return this.group.name;
  }

  set name(value: string) {
    this.group.name = value;
  }

  get questions(): [IQuestion] {
    return this.group.questions;
  }

  set questions(value: [IQuestion]) {
    this.group.questions = value;
  }

  public toJSON(): Object {
    let values: IGroup = <IGroup>{};
    values.id = this.id;
    values.name = this.name;
    values.questions = this.questions;

    return values;
  }

}
