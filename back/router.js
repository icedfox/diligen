'use strict';

const express = require('express');
const Documents = require('../back/documents.controller.js');
const Auth = require('../back/auth.controller.js');
const passport = require('passport');
const Strategy = require('../back/passport');

passport.use(Strategy.local);
passport.use(Strategy.jwt);

const requireAuth = passport.authenticate('jwt', { session: false });

const headers = [
	'Origin',
	'X-Requested-With',
	'Content-Type',
	'Accept',
	'x-access-token',
	'Authorization',
	'Pragma',
	'Cache-Control',
	'If-Modified-Since'
].join(', ');

module.exports = function (app) {
	var apiRoute = express.Router();

	apiRoute.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', headers);
		next();
	});

	apiRoute.get('/', (req, res) => res.status(200).json());
	apiRoute.get('/ping', (req, res) => res.status(200).send('pong'));

	app.get('/documents/:index', requireAuth, (req, res) => {

		let index = req.params.index -1;
		let result = Documents.fetchDocument(index);

		if (result) {
			res.status(200).send(result);
		} else {
			res.status(404).send('error');
		}
	});

	app.post('/login', Auth.login);

	app.use(apiRoute);
};
