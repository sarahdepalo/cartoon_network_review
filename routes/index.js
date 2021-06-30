'use strict';

const express = require('express');
const router = express.Router();
const ReviewsModel = require('../models/ReviewsModel');
const slugify = require('slugify');

router.get('/:slug?', async (req, res) => {
    if (!!req.params.slug) {
        const { slug } = req.params;
        const theShow = await ReviewsModel.getBySlug(slug);
        const allReviews = await ReviewsModel.getReviews(theShow.id);
        res.render('template', {
            locals: {
                title: 'Show Details!',
                show: theShow,
                reviews: allReviews,
                is_logged_in: req.session.is_logged_in,
                user_id: req.session.user_id
            },
            partials: {
                body: 'partials/show-details'
            }
        });
    } else {
        const allShowData = await ReviewsModel.getAllShows();
        res.render('template', {
            locals: {
                title: 'Review Your Favorite Shows!',
                data: allShowData,
                is_logged_in: req.session.is_logged_in
            },
            partials: {
                body: 'partials/home'
            }
        })
    }

});


router.post('/', async (req, res) => {
    const {show_name, user_name, rating, review} = req.body;
    const newReview = new ReviewsModel(show_name, user_name, review, rating);

    const response = await newReview.addReview();

    res.redirect('/');
    // res.sendStatus(200);
});

module.exports = router;