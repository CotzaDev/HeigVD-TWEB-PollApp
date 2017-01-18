"use strict";

import * as express from "express";
import { User } from '../models/user';
import { Group } from '../models/group';
import { Question } from '../models/question';
import { Answer } from '../models/answer';

export class Questions {
  public getAll(req: express.Request, res: express.Response) {
    let user: User = req.user;
    return res.send(user.groups);
  }

  public addGroup(req: express.Request, res: express.Response) {
    let user: User = req.user;

    user.addGroup(req.body)
      .then((data: Group) => res.send(data))
      .catch(() => res.status(500).send("An error occured while saving group")
    );
  }

  public addQuestion(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let group: Group = user.findGroup(req.params.id);

    group.addQuestion(req.body)
      .then((data: Question) => res.send(data))
      .catch(() => res.status(500).send("An error occured while saving question")
    );
  }

  public addAnswer(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let group: Group = user.findGroup(req.params.id_g);
    let question: Question = group.findQuestion(req.params.id_q)

    question.addAnswer(req.body)
      .then((data: Answer) => res.send(data))
      .catch(() => res.status(500).send("An error occured while saving answer")
    );
  }
}
