import * as mongoose from "mongoose";

module AnswerModel {
  export interface IAnswer {
    answer: string,
    isCorrect: Boolean
  }

  export interface AnswerModel extends IAnswer, mongoose.Document{};

  export var answerSchema: mongoose.Schema = new mongoose.Schema({
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
  });

  export var Model: mongoose.Model<AnswerModel>;
  Model = mongoose.model<AnswerModel>("Answer", answerSchema);
}

export = AnswerModel;
