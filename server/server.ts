"use strict";

import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';


export class Server {

    private app: express.Express;
    private serv: http.Server;
    private io: any;

    constructor() {
        this.app = express();
        this.serv = http.Server(this.app);
        this.io = socketio(this.serv);

        this.app.use('/', express.static('../dist'));
        this.app.set('port', (process.env.PORT || 5000));

        this.io.on('connection', function(){
          console.log('a user connected');
        });
    }

    public setRoutes() {
        this.app.get('/test', this._RenderHelloWorld);
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
