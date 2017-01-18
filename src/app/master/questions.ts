export interface IGroup {
  id: string,
  name: string,
  questions: [IQuestion]
}

export interface IQuestion {
  id: string,
  question: string,
  multi_answers: Boolean,
  answers: [any]
}
