"use strict";

import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as mongoose from 'mongoose';
import * as bodyParser from "body-parser";
import * as passJwt from 'passport-jwt';
import * as passport from 'passport';

import { User } from './models/user';
import { Login } from './controllers/login/api';
import { Questions } from './controllers/questions';

class JwtOpts implements passJwt.StrategyOptions {
  public jwtFromRequest: passJwt.JwtFromRequestFunction = passJwt.ExtractJwt.fromAuthHeaderWithScheme("Bearer");
  secretOrKey: string = "Ag93Y6jPRZQ2nAY94GcnNuh";
}

export class Server {

    private app: express.Application;
    private serv: http.Server;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.serv = http.createServer(this.app);
        this.io = socketio(this.serv);

        (<any>mongoose).Promise = Promise;
        mongoose.connect('mongodb://localhost:32768/pollapp');

        let jwtOpts: JwtOpts= new JwtOpts();
        let pStretegy: passJwt.Strategy = new passJwt.Strategy(jwtOpts, this.getUser);
        passport.use(pStretegy);

        this.app.use(bodyParser.json());

        this.app.use('/', express.static('../dist'));
        this.app.set('port', (process.env.PORT || 5000));

        this.io.on('connection', function(){
          console.log('a user connected');
        });
    }

    public setRoutes() {
        let login: Login = new Login();
        let questions: Questions = new Questions();
        this.app.get('/test', this._RenderHelloWorld);
        this.app.post('/api/register', login.register.bind(login.register));
        this.app.post('/api/login', login.login.bind(login.login));
        this.app.get('/api/question/all', passport.authenticate('jwt', { session: false}), questions.getAll.bind(questions.getAll));
        this.app.post('/api/group/add', passport.authenticate('jwt', { session: false}), questions.addGroup.bind(questions.addGroup));
        this.app.post('/api/group/:index/question/add', passport.authenticate('jwt', { session: false}), questions.addQuestion.bind(questions.addQuestion));
    }

    public startServer() {
        this.serv.listen(this.app.get('port'), function () {
            console.log('Example app listening on port');
        });
    }

    private _RenderHelloWorld(req: express.Request, res: express.Response) {
        res.send('Hello World!');
        console.log(req);
    }

    private getUser(payload: any, done: passJwt.VerifiedCallback) {
      User.findOne(payload.username)
        .then((user: User) => done(null, user))
        .catch(() => done("User not present in DB"));
    }
}
