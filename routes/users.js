'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UsersModel = require('../models/users');

router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Registration',
            is_logged_in: req.session.is_logged_in
        },

        partials: {
            body: 'partials/signup'
        }
    })
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Login',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/login'
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.post('/signup', async (req, res) => {
    const {user_name, user_password, user_email} = req.body;
    
    //Synchronous methods since these need to be done before we move on
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user_password, salt);

    // Replace password with hash made above
    const response = await UsersModel.addUser(user_name, hash, user_email);

    if (!!response.id) {
        res.redirect('/users/login');
    } else {
        res.status(500).send('ERROR: Please try submitting the form again.');
    }
});

router.post('/login', async (req, res) => {
    const {user_email, user_password} = req.body;

    const user = new UsersModel(null, null, user_password, user_email);
    const response = await user.login();

    if (!!response.isValid) {
        const { isValid, user_id, user_name } = response;

        req.session.is_logged_in = isValid;
        req.session.user_id = user_id;
        req.session.user_name = user_name;
        
        res.redirect('/');

    } else {
        res.sendStatus(403); // status code 403 is forbidden
    }
});


module.exports = router;