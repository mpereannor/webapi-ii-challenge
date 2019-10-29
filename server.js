const express = require('express');
const server = express();

//using a piece of middleware

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`wassup`)
});

module.exports = server;