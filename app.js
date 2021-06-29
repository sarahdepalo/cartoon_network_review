'use strict';

const http = require('http');
const port = 3000;
const hostname = '127.0.0.1';

const express = require('express');
const session = require('express-session');
const app = express();

const helmet = require('helmet');
app.use(helmet());

const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger); 

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

// secret is required - uses this secret to sign cookie, basically anything can go in here. 
//Seting resave to false in this situation since we are doing so much testing and don't want to have to worry about clearing cache
app.use(session({
    secret: 'get rad!',
    resave: false,
    saveUninitialized: false,
    is_logged_in: false
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at: http://${hostname}:${port}`);
});

const rootController = require('./routes/index');
const usersController = require('./routes/users');

app.use('/', rootController);
app.use('/users', usersController);
