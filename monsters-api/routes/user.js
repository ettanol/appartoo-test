"use strict";
const express = require('express');
const router = express.Router();
const { login, signup, logout, isLoggedIn } = require('../controllers/user');
const auth = require('../middleware/auth');
router.post('/signup', signup);
router.post('/login', login);
router.get('/isLoggedIn/:pseudo', auth, isLoggedIn)
router.post('/logout/', auth, logout);
module.exports = router;
