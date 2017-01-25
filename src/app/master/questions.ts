export interface IGroup {
  _id: string,
  name: string,
  questions: Array<IQuestion>
}

export interface IQuestion {
  _id: string,
  question: string,
  multi_answers: Boolean,
  answers: Array<IAnswer>
}

export interface IAnswer {
  _id: string,
  answer: string,
  isCorrect: Boolean
}

export class SendPayload {
  groupID: string;
  questionID: string;
  time: number;
}
