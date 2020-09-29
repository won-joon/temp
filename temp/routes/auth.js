const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('./loginstatus');
const { User } = require('../models');

const router = express.Router();

//회원 가입 처리
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { nick, password } = req.body;
    try{
        const exUser = await User.findOne({ where: { nick }});
        if(exUser){
            req.flash('joinError', '이미 가입된 이메일입니다');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            nick,
            password: hash,
        });
        return res.redirect('/');
    }catch(error){
        console.error(error);
        next(error);
    }
});

//로그인 처리
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});


router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
