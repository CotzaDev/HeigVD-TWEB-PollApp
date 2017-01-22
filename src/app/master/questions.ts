export interface IGroup {
  _id: string,
  name: string,
  questions: [IQuestion]
}

export interface IQuestion {
  _id: string,
  question: string,
  multi_answers: Boolean,
  answers: [any]
}

export class SendPayload {
  groupID: string;
  questionID: string;
  time: number;
}
