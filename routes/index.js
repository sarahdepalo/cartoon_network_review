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
                reviews: allReviews
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
                data: allShowData
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
    console.log('Post response is', response);
    res.sendStatus(200);
});

module.exports = router;