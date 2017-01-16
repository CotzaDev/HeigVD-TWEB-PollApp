"use strict";

import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as mongoose from 'mongoose';
import * as bodyParser from "body-parser";

import { Login } from './controllers/login/api';

export class Server {

    private app: express.Application;
    private serv: http.Server;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.serv = http.createServer(this.app);
        this.io = socketio(this.serv);

        (<any>mongoose).Promise = Promise;
        mongoose.connect('mongodb://localhost:27017/pollapp');

        this.app.use(bodyParser.json());

        this.app.use('/', express.static('../dist'));
        this.app.set('port', (process.env.PORT || 5000));

        this.io.on('connection', function(){
          console.log('a user connected');
        });
    }

    public setRoutes() {
        let login: Login = new Login();
        this.app.get('/test', this._RenderHelloWorld);
        this.app.post('/api/register', login.register.bind(login.register));
        this.app.post('/api/login', login.login.bind(login.login));
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
}
