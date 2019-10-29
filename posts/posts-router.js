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
                data: data.body
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



//insertCommentById

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const newPost = req.body;
    const { contents } = newPost;
    if(!id){
        res
        .status(404)
        .json({
            message: "The post with the specified ID does not exist."
        });
    }
    else if (!contents) {
        res
        .status(400)
        .json({
            errorMessage: "Please provide text for the comment."
        });
    }
    else{
        Posts.insertComment({
                text: contents,
                post_id: id
        })
        .then(comment => {
            res.status(201).json({
                success: true, 
                comment
            })
        })
        .catch(() => {
            res.status(500).json({

                error: "There was an error while saving the comment to the database."
            });
        });
    }
})

//getPosts

router.get('', (req, res) => { 
    Posts.find()
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(error => {
        res.status(404).json({
            message: "The post information could not be retrieved",
            error
        })
    })
})

//getPostById

router.get('/:id/comments', (req, res) => { 
    const { id } = req.params;
    Posts.findById(id)
    .then(posts => {
        res.status(201).json(posts) 
    })
    .catch(error => {
        res.status(404).json({
            message: "The post with the specified ID does not exist.",
            error
        })
    })
    
})

module.exports = router;