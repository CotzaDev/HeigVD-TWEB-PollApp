"use strict";
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passJwt = require("passport-jwt");
var passport = require("passport");
var user_1 = require("./models/user");
var api_1 = require("./controllers/login/api");
var questions_1 = require("./controllers/questions");
var JwtOpts = (function () {
    function JwtOpts() {
        this.jwtFromRequest = passJwt.ExtractJwt.fromAuthHeaderWithScheme("Bearer");
        this.secretOrKey = "Ag93Y6jPRZQ2nAY94GcnNuh";
    }
    return JwtOpts;
}());
var Server = (function () {
    function Server() {
        this.app = express();
        this.serv = http.createServer(this.app);
        this.io = socketio(this.serv);
        mongoose.Promise = Promise;
        mongoose.connect('mongodb://localhost:32768/pollapp');
        var jwtOpts = new JwtOpts();
        var pStretegy = new passJwt.Strategy(jwtOpts, this.getUser);
        passport.use(pStretegy);
        this.app.use(bodyParser.json());
        this.app.use('/', express.static('../dist'));
        this.app.set('port', (process.env.PORT || 5000));
        this.io.on('connection', function () {
            console.log('a user connected');
        });
    }
    Server.prototype.setRoutes = function () {
        var login = new api_1.Login();
        var questions = new questions_1.Questions();
        this.app.get('/test', this._RenderHelloWorld);
        this.app.post('/api/register', login.register.bind(login.register));
        this.app.post('/api/login', login.login.bind(login.login));
        this.app.get('/api/question/all', passport.authenticate('jwt', { session: false }), questions.getAll.bind(questions.getAll));
        this.app.post('/api/group/add', passport.authenticate('jwt', { session: false }), questions.addGroup.bind(questions.addGroup));
        this.app.post('/api/group/:id/question/add', passport.authenticate('jwt', { session: false }), questions.addQuestion.bind(questions.addQuestion));
        this.app.post('/api/group/:id_g/question/:id_q/answer/add', passport.authenticate('jwt', { session: false }), questions.addAnswer.bind(questions.addAnswer));
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
    Server.prototype.getUser = function (payload, done) {
        user_1.User.findOne(payload.username)
            .then(function (user) { return done(null, user); })
            .catch(function () { return done("User not present in DB"); });
    };
    return Server;
}());
exports.Server = Server;
