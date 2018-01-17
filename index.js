
/**
 * Created by INNOVATIONISTv1.2 on 1/16/2018.
 */

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const mongoose = require('mongoose');
const container = require('./app.container');
const socketIO = require ('socket.io');
const {Clients} = require('./helpers/connectedclients');
const {GroupChatCollector} = require('./helpers/chatGarbageCollector');

container.resolve(function(users){

    try {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/greathealthnetwork', {useMongoClient: true});

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));

        db.once('open', function(){

            console.log(" sucessfully connected to greateHealthnetwork db");
        });

    } catch (error) {
        
    }

    
    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app); 
        const io =  socketIO(server);
        server.listen(28080, function(){
            console.log('Listening on port 28080');
        });

        ConfigureExpress(app);
        // now add io files....
        require('./socket/groupchat')(io,Clients,GroupChatCollector);
        require('./socket/privatemessage')(io,GroupChatCollector);


        // adding express promise router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        // enabling CORS
          app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Expose-Headers","*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });
        app.use(router);
    }

    // configuring express
    function ConfigureExpress(app){
        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
       
    }
});