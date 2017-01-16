"use strict";
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var api_1 = require("./controllers/login/api");
var Server = (function () {
    function Server() {
        this.app = express();
        this.serv = http.createServer(this.app);
        this.io = socketio(this.serv);
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost:27017/pollapp');
        this.app.use(bodyParser.json());
        this.app.use('/', express.static('../dist'));
        this.app.set('port', (process.env.PORT || 5000));
        this.io.on('connection', function () {
            console.log('a user connected');
        });
    }
    Server.prototype.setRoutes = function () {
        var login = new api_1.Login();
        this.app.get('/test', this._RenderHelloWorld);
        this.app.post('/api/register', login.register.bind(login.register));
        this.app.post('/api/login', login.login.bind(login.login));
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
