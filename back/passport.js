'use strict';

const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const secret = 'secret';

// for sake of simplicity... encrypt otherwise
const user = {
	username: 'diligen',
	password: 'challenge'
};

/*
	Local login strategy
 */
const localStrategy = new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, (username, password, done) => {
	if (username === user.username && password === user.password) {
		return done(null, user);
	} else {
		return done('Wrong credentials', false);
	}
});

/*
    Passport Strategy for JWT authentication
 */
const jwtStrategy = new JWTStrategy({
	secretOrKey: secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (payload, done) => {
	let username = payload.s;
	if (username === user.username) {
		return done(null, user);
	} else {
		return done('User not found', false);
	}
});

module.exports = {
	local: localStrategy,
	jwt: jwtStrategy
};
