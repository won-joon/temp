const express = require('express');
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
    res.render('main', {
        title: 'Node',
        user: req.user,
        loginError: req.flash('loginError'),
    });
});



module.exports = router;