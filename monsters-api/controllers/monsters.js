"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/users');
exports.getMonsters = (req, res) => {
    User.find()
        .then((monsters) => res.status(200).json(monsters))
        .catch((error) => res.status(500).json({ error }));
};
