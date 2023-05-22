var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userService } = require('../services/userService');
let config = require('./config');


passport.use(new LocalStrategy(
    (email, password, done) => {
        console.log('email: ', email);
        console.log('password: ', password);
        userService.findUser(email, (err, result) => {
            
            if (err) { return done(err); }
            if (!result) {
                return done('Incorrect email', false, { message: 'Incorrect email.' });
            }
            if (!bcrypt.compareSync(password, result.password)) {
                return done('Incorrect password.', false, { message: 'Incorrect password.' });
            }
            //BUILD OUR TOKEN
            console.log('Result: ', result);

            let token = {
                email: result.email,
                role: result.role
            }
            let newToken = jwt.sign(token, config.secret);

            console.log('newToken: ', newToken);

            let user = {
                user: result,
                token: newToken
            }
            return done(null, user);
        });
    }
));

module.exports = passport;