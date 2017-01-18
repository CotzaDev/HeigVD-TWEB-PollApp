import { IUserModel } from './mongoose/user';
import { IAnswerModel } from './mongoose/answer';
import { User } from './user';

export class Answer {
  private userModel: IUserModel;
  private model: IAnswerModel;
  public user: User;

  constructor(user: User, model: IAnswerModel) {
    this.user = user;
    this.userModel = user.model;
    this.model = model;
  }

  public save(): Promise<any> {
    return this.userModel.save();
  }

  get id(): string {
    return this.model.id;
  }

  get answer(): string {
    return this.model.answer;
  }

  set answer(value: string) {
    this.model.answer = value;
  }

  get isCorrect(): Boolean {
    return this.model.isCorrect;
  }

  set isCorrect(value: Boolean) {
    this.model.isCorrect = value;
  }

}
