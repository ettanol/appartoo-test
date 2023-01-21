const express = require('express');
const router = express.Router();

const { 
    getMonsters,
    getUser,
    invite
} = require ( '../controllers/monsters');
const auth = require('../middleware/auth');

router.get('/getMonsters', auth, getMonsters);
router.get('/getUser', auth, getUser);
router.post('invite', auth, invite);

module.exports = router;