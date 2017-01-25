import * as mongoose from "mongoose";

module AnswerModel {
  export interface IAnswer {
    id: string,
    answer: string,
    isCorrect: Boolean
  }

  export interface IAnswerModel extends IAnswer, mongoose.Document{};

  export var answerSchema: mongoose.Schema = new mongoose.Schema({
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
  });

  export var Model: mongoose.Model<IAnswerModel>;
  Model = mongoose.model<IAnswerModel>("Answer", answerSchema);
}

export = AnswerModel;
