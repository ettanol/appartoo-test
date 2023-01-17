const express = require('express');
const router = express.Router();

const { 
    getMonsters
} = require ( '../controllers/monsters');
const auth = require('../middleware/auth');

router.get('/getMonsters', auth, getMonsters);

module.exports = router;