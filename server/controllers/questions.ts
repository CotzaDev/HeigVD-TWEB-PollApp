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
      .then((data: Group) => res.send({id: data.id}))
      .catch(() => res.status(500).send("An error occured while saving group")
    );
  }

  public removeGroup(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let group: Group = user.findGroup(req.params.id);

    if(group === undefined) {
      return res.status(500).send("No group with this id found");
    }

    group.remove()
      .then(() => res.send({status: "ok"}))
      .catch(() => res.status(500).send("An error occured while removing group")
    );
  }

  public addQuestion(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let group: Group = user.findGroup(req.params.id);

    if(group === undefined) {
      return res.status(500).send("No group with this id found");
    }

    group.addQuestion(req.body)
      .then((data: Question) => res.send({id: data.id}))
      .catch(() => res.status(500).send("An error occured while saving question")
    );
  }

  public addAnswer(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let group: Group = user.findGroup(req.params.id_g);
    if(group === undefined) {
      return res.status(500).send("No group with this id found");
    }

    let question: Question = group.findQuestion(req.params.id_q)
    if(question === undefined) {
      return res.status(500).send("No question with this id found");
    }

    question.addAnswer(req.body)
      .then((data: Answer) => res.send({id: data.id}))
      .catch(() => res.status(500).send("An error occured while saving answer")
    );
  }
}
