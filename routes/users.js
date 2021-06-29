'use strict';

const express = require('express');
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Registration'
        },

        partials: {
            body: 'partials/signup'
        }
    })
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Login'
        },
        partials: {
            body: 'partials/login'
        }
    })
});

router.post('/signup', (req, res) => {
    const {user_name, user_email, user_password} = req.body;
    console.log(req.body);
    res.sendStatus(200);
});

router.post('/login', (req, res) => {
    const {user_email, user_password} = req.body;
    console.log(req.body);
    res.sendStatus(200);
});


module.exports = router;