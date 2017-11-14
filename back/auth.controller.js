'use strict';
const passport = require('passport');
const Crypto = require('../back/crypto');

class Auth {

	login (req, res) {
		passport.authenticate('local', {
			session: false
		}, function (err, user, info) {
			var resp = {};

			if (user) {
				resp.token = Crypto.getJWT(user);
				resp.user = {username: user.username};

				res.status(200).json(resp);
			} else {
				res.status(500).json(resp);
			}
		})(req, res);
	}
}

module.exports = new Auth();
