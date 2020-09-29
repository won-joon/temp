const express = require('express');
const { Post, User } = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        await Post.create({
            content: req.body.content,
            userId: req.user.id,
        });
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});


module.exports = router;