import * as mongoose from "mongoose";
import { questionSchema, IQuestion } from './question';

module GroupModel {
  export interface IGroup {
    id: string,
    name: string,
    questions: [IQuestion]
  }

  export interface IGroupModel extends IGroup, mongoose.Document{};

  export var groupSchema: mongoose.Schema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: [questionSchema]
  });

  export var Model: mongoose.Model<IGroupModel>;
  Model = mongoose.model<IGroupModel>("Group", groupSchema);
}

export = GroupModel;
