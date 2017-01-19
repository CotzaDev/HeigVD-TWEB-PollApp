"use strict";

import * as express from "express";
import { User } from '../../models/user';
import * as jwt from 'jsonwebtoken';

var jwtKey = "Ag93Y6jPRZQ2nAY94GcnNuh";

class jwtPayload {
  public username: string;
  public issue_date: Date;

  constructor(username: string, issue_date: Date) {
    this.username = username;
    this.issue_date = issue_date;
  }
}

export class Login {
  public register(req: express.Request, res: express.Response) {

    let emailRe: RegExp = /\S+@\S+\.\S+/;

    if(!req.body.username || !req.body.email || !req.body.password ||
      req.body.password.length < 6 || req.body.username.length < 4 ||
      !emailRe.test(req.body.email)) {
      return res.status(422).send("Invalid or missing user data");
    }

    let newUser: User = new User(req.body);
    newUser.hashPsw();

    newUser.save()
      .then(() => {
        let payload: jwtPayload = new jwtPayload(newUser.username, new Date());
        let token = jwt.sign(payload, jwtKey);

        res.json({"status": "ok", "token": token});
      })
      .catch((err: Error) => {
        if(err.name === "MongoError" && err.message.indexOf("E11000 duplicate key") != -1) {
          res.status(422).send("This username or email is not available");
        }
        else {
          console.log(err.message);
          res.status(500).send("An error occured during the creation");
        }
      });
  }

  public login(req: express.Request, res: express.Response) {
    if(!req.body.username || !req.body.password) {
      return res.status(422).send("Missing credentials");
    }

    User.findOne(req.body.username)
      .then((user: User) => {
        if(!user.checkPsw(req.body.password)) {
          return res.status(401).send("Wrong password");
        }

        let payload: jwtPayload = new jwtPayload(user.username, new Date());
        let token = jwt.sign(payload, jwtKey);

        res.json({"status": "ok", "token": token});
      })
      .catch(() => {
        return res.status(401).send("User not found");
      });
  }
}

export class SocketAuth {
  private authentificated: Map<string, User>;

  constructor() {
    this.authentificated = new Map<string, User>();
  }

  public onAuth(socket: SocketIO.Socket, token: string) {
    jwt.verify(token, jwtKey, (err: Error, decoded: any) => {
      if(err) {
        socket.emit('unothorized', 'Invalid token');
      }
      else {
        User.findOne(decoded.username)
          .then((user: User) => this.authentificated.set(socket.id, user))
          .catch(() => socket.emit('unothorized', 'User not found in DB')
        );
      }
    });
  }

  public onDisconnect(socket: SocketIO.Socket) {
    if(!this.isAuthentificated(socket))
      return;

    this.authentificated.delete(socket.id);
  }

  public isAuthentificated(socket: SocketIO.Socket): Boolean {
    return this.authentificated.has(socket.id);
  }

  public getUser(socket: SocketIO.Socket): User{
    return this.authentificated.get(socket.id);
  }


}
