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

router.post('/update', async (req, res, next) => {
    try{
        await Post.update({
            content: req.body.temp}, {where: {id: req.body.postId}}
        );
        res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        await Post.destroy({ 
            where: { id: req.params.id, userId: req.user.id }
        });
        res.send('OK');
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;