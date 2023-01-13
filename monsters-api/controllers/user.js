"use strict";
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
exports.signup = (req, res) => {
    let user;
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8, 'le mot de passe doit contenir 8 caractères minimum') // Minimum length 8
        .is().max(100, 'le mot de passe doit contenir 100 caractères maximum') // Maximum length 100
        .has().uppercase(1, 'le mot de passe doit contenir au moins une majuscule') // Must have uppercase letters
        .has().lowercase(1, 'le mot de passe doit contenir au moins une minuscule') // Must have lowercase letters
        .has().digits(2, 'le mot de passe doit contenir au moins deux chiffres') // Must have at least 2 digits
        .has().not().spaces() // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123', 'Motdepasse', '12345678', '123456789']); // Blacklist these values
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(403).json(passwordSchema.validate(req.body.password, { details: true }));
    }
    else if (req.body.pseudo.length < 20) {
        user = new User({
            pseudo: req.body.pseudo,
            password: req.body.password,
            role: "",
            profileImageUrl: "",
            isConnected: false,
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
            .catch(() => res.status(400).json({ message: 'Utilisateur déjà existant !' }));
    }
};
exports.login = () => {
    console.log('user logged in');
};
