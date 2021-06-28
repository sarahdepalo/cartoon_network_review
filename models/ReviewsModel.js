'use strict';

const db = require('./conn');

class ReviewsModel {
    constructor(id, user_name, review, rating) {
        this.id = id;
        this.user_name = user_name;
        this.review = review;
        this.rating = rating;
    }

    static async getAllShows() {
        try {
            const response = await db.any(`SELECT * FROM shows;`);
            return response
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    };

    static async getBySlug(slug) {
        try {
            const response = await db.one (
                `SELECT * FROM shows WHERE slug = '${slug}';`
            )
            return response;
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    async addReview() {
        try {
            const response = await db.result(
                `INSERT INTO reviews
                    (show_name, user_name, rating, review)
                VALUES
                    (${this.id}, '${this.user_name}', ${this.rating}, '${this.review}');`
            )
            return response
        } catch (error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    static async getReviews(showId) {
        try {
            //Need to fix this so the right reviews show up for the right shows. 
            const response = await db.any(
                `SELECT * FROM reviews
                INNER JOIN users on users.id = reviews.user_name
                INNER JOIN shows on shows.id = reviews.show_name 
                WHERE reviews.show_name = ${showId};`
            );
            return response;
        } catch(error) {
            console.error('ERROR: ', error);
        }
    }

}


module.exports = ReviewsModel;