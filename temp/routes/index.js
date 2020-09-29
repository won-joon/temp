const express = require('express');
const { Post, User } = require('../models');
const router = express.Router();


//회원가입 페이지
router.get('/join', (req, res) => {
    res.render('join', {
        title: '회원가입',
        loginError: req.flash('loginError'),
    });
});


//메인 페이지
router.get('/', (req, res, next) => {
    Post.findAll({
        include: {
            model: User,
            attributes: ['id', 'nick'],
        },
    })
        .then((posts) => {
            res.render('main', {
                title: 'Node',
                twits: posts,
                user: req.user,
                loginError: req.flash('loginError'),
            });
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});



module.exports = router;