'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const port = 3000;

// config
app.use(bodyParser.urlencoded({
	limit: '10mb',
	extended: true
}));

app.use(bodyParser.json({
	limit: '10mb'
}));

// auth
// app.use(passport.initialize());
// app.use(passport.session());

// router
const router = require('./router');
router(app);

app.listen(port, () => {
	console.log(`Diligen app listening on port ${port}`);
});