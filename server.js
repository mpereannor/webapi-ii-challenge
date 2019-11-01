const express = require('express');
const server = express();
const router = require('./posts/posts-router');

server.use(express.json());

//using a piece of middleware

server.use('/api/posts', router);

//dummy endpoint for testing

server.get('/', (req, res) => {
    res.send(`wassup`)
});


// const title = req.body.title;
// const content = req.body.content;
//if(!newPost.title || !newPost.comments){}

    
module.exports = server;

