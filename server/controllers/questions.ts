"use strict";

import * as express from "express";
import { User } from '../models/user';
import { Group } from '../models/group';
import { Question } from '../models/question';

export class Questions {
  public getAll(req: express.Request, res: express.Response) {
    let user: User = req.user;
    return res.send(user.groups);
  }

  public addGroup(req: express.Request, res: express.Response) {
    let user: User = req.user;
    //console.log(req.user);
    user.addGroup(req.body)
      .then((data: Group) => res.send(data))
      .catch((err) => res.status(500).send("An error occured while saving group" + err)
    );
  }

  public addQuestion(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let newQuestion: Question = new Question(user, req.params.index, req.body);
    newQuestion.save()
      .then(() => res.send(newQuestion))
      .catch((err) => res.status(500).send("An error occured while saving group" + err)
    );
  }
}
