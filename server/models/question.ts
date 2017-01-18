import { IUserModel } from './mongoose/user';
import { IQuestion } from './mongoose/question';
import { User } from './user';
import { IAnswer } from './mongoose/answer';

export class Question {
  private model: IUserModel;
  private _question: IQuestion;
  private index: number;
  public user: User;

  constructor(user: User, index: number, data?: IQuestion) {
    this.user = user;
    this.model = user.model;
    this.index = this.model.groups[index].questions.push({} as IQuestion);
    this.index--;
    this._question = this.model.groups[index].questions[this.index];

    this.model.isNew = false;

    if(data) {
      this.question = data.question,
      this.multi_answers = data.multi_answers,
      this.answers = data.answers;

      if((<any>data)._id) {
        (<any>this._question)._id = (<any>data)._id;
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

  get id(): string {
    return this._question.id;
  }

  get question(): string {
    return this._question.question;
  }

  set question(value: string) {
    this._question.question = value;
  }

  get multi_answers(): Boolean {
    return this._question.multi_answers;
  }

  set multi_answers(value: Boolean) {
    this._question.multi_answers = value;
  }

  get answers(): [IAnswer] {
    return this._question.answers;
  }

  set answers(value: [IAnswer]) {
    this._question.answers = value;
  }

  public toJSON(): Object {
    let values: IQuestion = <IQuestion>{};
    values.id = this.id;
    values.question = this.question;
    values.multi_answers = this.multi_answers;

    return values;
  }

}
