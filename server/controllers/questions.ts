"use strict";

import * as express from "express";
import { User } from '../models/user';
import { Group } from '../models/group';

export class Questions {
  public getAll(req: express.Request, res: express.Response) {
    let user: User = req.user;
    return res.send(user.groups);
  }

  public addGroup(req: express.Request, res: express.Response) {
    let user: User = req.user;
    let newGroup: Group = new Group(user.model, req.body);
    newGroup.save()
      .then(() => res.send(newGroup))
      .catch(() => res.status(500).send("An error occured while saving group")
    );
  }
}
