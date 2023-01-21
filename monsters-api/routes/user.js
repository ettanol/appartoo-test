"use strict";
const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controllers/user');
const auth = require('../middleware/auth');
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout/', auth, logout)
module.exports = router;
