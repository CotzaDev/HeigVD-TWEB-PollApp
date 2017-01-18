import { IUserModel } from './mongoose/user';
import { IGroupModel } from './mongoose/group';
import { IQuestion, IQuestionModel } from './mongoose/question';
import { User } from './user';
import { Question } from './question';

export class Group {
  private userModel: IUserModel;
  private model: IGroupModel;
  public user: User;

  constructor(user: User, model: IGroupModel) {
    this.user = user;
    this.userModel = user.model;
    this.model = model;
  }

  public save(): Promise<any> {
    return this.userModel.save();
  }

  public addQuestion(data: IQuestion): Promise<Question> {
    let index = this.model.questions.push({} as IQuestion);
    index--;
    let question: IQuestion = this.model.questions[index];

    question.question = data.question;
    question.multi_answers = data.multi_answers;

    return this.save()
      .then(() => {
        return Promise.resolve(new Question(this.user, <IQuestionModel>this.questions[index]));
      });
  }

  public findQuestion(id: string): Question {
    let model: IQuestionModel = this.model.questions.id(id);
    return new Question(this.user, model);
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

}
