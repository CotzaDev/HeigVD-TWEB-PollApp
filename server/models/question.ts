import { IQuestionModel } from './mongoose/question';
import { IUserModel } from './mongoose/user';
import { User } from './user';
import { IAnswer, IAnswerModel } from './mongoose/answer';
import { Answer } from './answer';

export class Question {
  private userModel: IUserModel;
  private model: IQuestionModel;
  public user: User;

  constructor(user: User, model: IQuestionModel) {
    this.user = user;
    this.userModel = user.model;
    this.model = model;
  }

  public save(): Promise<any> {
    return this.userModel.save();
  }

  public addAnswer(data: IAnswer): Promise<Answer> {
    let index = this.model.answers.push({} as IAnswer);
    index--;
    let answer: IAnswer = this.model.answers[index];

    answer.answer = data.answer;
    answer.isCorrect = data.isCorrect;

    return this.save()
      .then(() => {
        return Promise.resolve(new Answer(this.user, <IAnswerModel>this.answers[index]));
      });
  }

  get id(): string {
    return this.model._id;
  }

  get question(): string {
    return this.model.question;
  }

  set question(value: string) {
    this.model.question = value;
  }

  get multi_answers(): Boolean {
    return this.model.multi_answers;
  }

  set multi_answers(value: Boolean) {
    this.model.multi_answers = value;
  }

  get answers(): [IAnswer] {
    return this.model.answers;
  }

}
