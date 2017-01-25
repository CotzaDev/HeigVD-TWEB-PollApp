import * as mongoose from "mongoose";
import { answerSchema } from './answer';

module QuestionModel {
  export interface IQuestion {
    id: string,
    question: string,
    multi_answers: Boolean,
    answers: any
  }

  export interface IQuestionModel extends IQuestion, mongoose.Document{};

  export var questionSchema: mongoose.Schema = new mongoose.Schema({
    question: { type: String, unique: true, required: true },
    multi_answers: { type: Boolean, required: true },
    answers: [answerSchema]
  });

  export var Model: mongoose.Model<IQuestionModel>;
  Model = mongoose.model<IQuestionModel>("Question", questionSchema);
}

export = QuestionModel;
