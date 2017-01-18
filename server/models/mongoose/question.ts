import * as mongoose from "mongoose";
import { answerSchema, IAnswer } from './answer';

module QuestionModel {
  export interface IQuestion {
    id: string,
    question: string,
    multi_answers: Boolean,
    answers: [IAnswer]
  }

  export interface QuestionModel extends IQuestion, mongoose.Document{};

  export var questionSchema: mongoose.Schema = new mongoose.Schema({
    question: { type: String, unique: true, required: true },
    multi_answers: { type: Boolean, required: true },
    answers: [answerSchema]
  });

  export var Model: mongoose.Model<QuestionModel>;
  Model = mongoose.model<QuestionModel>("Question", questionSchema);
}

export = QuestionModel;
