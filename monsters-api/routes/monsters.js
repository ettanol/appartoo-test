"use strict";
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { getMonsters, getUser, invite, accept, decline, block, updateProfile } = require('../controllers/monsters');
router.get('/getMonsters', auth, getMonsters);
router.get('/user/:pseudo', auth, getUser);
router.post('/invite', auth, invite);
router.post('/accept', auth, accept);
router.post('/decline', auth, decline);
router.post('/block', auth, block);
router.put('/modify/:user', auth, multer, updateProfile)
module.exports = router;
