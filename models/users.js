'use strict';

const db = require('./conn');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, user_name, user_password, user_email) {
        this.id = id;
        this.user_name = user_name;
        this.user_password = user_password;
        this.user_email = user_email;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.user_password, hashedPassword);
    }

    static async addUser(user_name, user_password, user_email) {
        try { // a prepared statement is assigning the inerpolation to a variable instead of on the fly. 
            const query = `INSERT INTO users (user_name, user_password, user_email) VALUES ('${user_name}', '${user_password}', '${user_email}') RETURNING id;`
            // Passes a string, no longer have to worry about info being passed as a bad sql statement
            const response = await db.one(query); 
            return response
        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

    async login() {
        try {
            //Lookup the user by their email address
            const query = `SELECT * FROM users WHERE user_email = '${this.user_email}';`;
            const response = await db.one(query);
            //Check user's password based on the hash 
            console.log('LOGIN RESPONSE OBJECT: ', response);
            const isValid = this.checkPassword(response.user_password);
            //return a response to the controller, either valid or not
            if (!!isValid) {
                const { id, user_name } = response;
                return { isValid, user_id: id, user_name };
            } else {
                return { isValid };
            }


        } catch(error) {
            console.error('ERROR: ', error);
            return error;
        }
    }

};

module.exports = User;