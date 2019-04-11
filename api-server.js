require('./handlers/dataConnector.js').connect();

const express = require('express');
const parser = require('body-parser');

// create an express app
global.app = express(); 

//serve static files from public folder
app.use(express.static('public'));
//add a path to static
app.use('static', express.static('public'));

// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

// for root requests, render the index.pug view
app.get('/', function (req, res) {
    res.render('index', { title: 'Node 2 Lab', heading: 'Sample Pug File' })
});

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');


// use the route handlers
const bookServer = require('./book-server.js');
const imageServer = require('./image-server.js');

//custom 404 error
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

let port = 8080;
app.listen(port, function () {
    console.log("Server running at port= " + port);
});
