'use strict';

const jwt = require('jsonwebtoken');
const secret = 'secret';

class Crypto {

	getJWT (user) {
		let s = user.username;
		return this.generateJWT({s});
	}

	generateJWT (user) {
		return jwt.sign(user, secret, {
			expiresIn: 10000
		});
	}
}
module.exports = new Crypto();
