"use strict";
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var Server = (function () {
    function Server() {
        this.app = express();
        this.serv = http.Server(this.app);
        this.io = socketio(this.serv);
        this.app.use('/', express.static('../dist'));
        this.app.set('port', (process.env.PORT || 5000));
        this.io.on('connection', function () {
            console.log('a user connected');
        });
    }
    Server.prototype.setRoutes = function () {
        this.app.get('/test', this._RenderHelloWorld);
    };
    Server.prototype.startServer = function () {
        this.serv.listen(this.app.get('port'), function () {
            console.log('Example app listening on port');
        });
    };
    Server.prototype._RenderHelloWorld = function (req, res) {
        res.send('Hello World!');
        console.log(req);
    };
    return Server;
}());
exports.Server = Server;
