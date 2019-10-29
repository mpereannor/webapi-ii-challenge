const express = require('express');
const Posts = require('../data/db');

const router = express.Router();

//ENDPOINTS

//createPost Endpoint

router.post('', (req, res) => {
    const newPost = req.body;
    const { title, contents } = newPost;

    if( !title || !contents ) {
        res.status(400).json({
            alert: "Alert! Provide title and contents"
        });
    }
    else{

        Posts.insert(newPost)
        .then(data => {
            res.status(201).json({
                success: true,
                data
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error creating post',
                error
            })
        })
    }
    });

module.exports = router;
