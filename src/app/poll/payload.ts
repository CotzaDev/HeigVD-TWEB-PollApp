export interface IQuestion {
  _id: string,
  question: string,
  multi_answers: Boolean,
  answers: [any]
}

export interface IActiveQuestion {
  time: number,
  question: string,
  answers: Array<string>,
  expire: Date;
}

export interface IResult {
  answer: string,
  isCorrect: Boolean,
  nbResponse: number
}

export interface IResults {
  question: string,
  responses: number,
  hasCorrect: Boolean,
  answers: Array<IResult>
}
