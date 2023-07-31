var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const port = process.env.PORT || '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
	secret:'@#@$_NEW_POKER_#@$#$',
	resave:true,
	saveUninitialized:true
}));

var router = require('./backend/Router/main')(app);
require('./backend/Controller/SocketController')(app,port);