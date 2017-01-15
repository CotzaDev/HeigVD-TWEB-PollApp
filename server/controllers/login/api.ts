"use strict";

import * as express from "express";

export class Login {

  public register(req: express.Request, res: express.Response) {
    console.log(req.body);
    //render page
    res.send('{"status": "ok"}');
  }
}
