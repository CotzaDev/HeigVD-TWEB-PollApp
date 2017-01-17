import { IUserModel } from './mongoose/user';
import { IGroup } from './mongoose/group';

export class Group {
  private model: IUserModel;
  private group: IGroup;
  private index: number;

  constructor(userModel: IUserModel, data?: IGroup) {
    this.model = userModel;
    this.index = this.model.groups.push({} as IGroup);
    this.index--;
    this.group = this.model.groups[this.index];

    this.model.isNew = false;

    if(data) {
      this.name = data.name;
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

  get id(): string {
    return this.group.id;
  }

  get name(): string {
    return this.group.name;
  }

  set name(value: string) {
    this.group.name = value;
  }

  public toJSON(): Object {
    let values: IGroup = <IGroup>{};
    values.id = this.id;
    values.name = this.name;

    return values;
  }

}
