import { IGroupModel, Model } from './mongoose/group';
import { IGroup } from './mongoose/group';
import { IQuestion } from './mongoose/question';
import { User } from './user';

export class Group {
  private model: IGroupModel;
  public user: User;

  constructor(data?: IGroup, model?: IGroupModel) {
    this.model = new Model();

    if(model) {
      this.model = model;
    }
    else if(data) {
      this.name = data.name;
      this.questions = data.questions;
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

  public static findById(id: string): Promise<Group> {
    let result: Group;

    return Model.findOne({"_id": id})
      .then((data: IGroupModel) => {
        if(data) {
          result = new Group(null, data);
          return Promise.resolve(result);
        }
        return Promise.reject("No user found");
      });
  }

  get id(): string {
    return this.model.id;
  }

  get name(): string {
    return this.model.name;
  }

  set name(value: string) {
    this.model.name = value;
  }

  get questions(): [IQuestion] {
    return this.model.questions;
  }

  set questions(value: [IQuestion]) {
    this.model.questions = value;
  }

  public toJSON(): Object {
    let values: IGroup = <IGroup>{};
    values.id = this.id;
    values.name = this.name;
    values.questions = this.questions;

    return values;
  }

}
